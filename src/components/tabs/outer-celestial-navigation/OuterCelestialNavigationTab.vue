<script>
import svgPanZoom from "svg-pan-zoom";


import NodeBackground from "../celestial-navigation/NodeBackground";
import NodeOverlay from "../celestial-navigation/NodeOverlay";
import NodeRing from "../celestial-navigation/NodeRing";
import ProgressConnector from "../celestial-navigation/ProgressConnector";

import { OUTER_CELESTIAL_NAV_DRAW_ORDER } from "@/core/secret-formula/outer/outer-navigation";


export default {
  name: "OuterCelestialNavigationTab",
  components: {
    NodeRing,
    NodeBackground,
    NodeOverlay,
    ProgressConnector
  },
  data: () => ({
    nodeState: null,
  }),
  computed: {
    db() {
      return {
        ...GameDatabase.outer.outernavigation,
      };
    },
    drawOrder() {
      const db = this.db;
      const order = [];
      for (const nodeId of Object.keys(db)) {
        const node = db[nodeId];
        if (node.connector instanceof Array) {
          for (const config of node.connector) {
            order.puch({
              nodeId,
              is: ProgressConnector,
              config,
              drawOrder: config.drawOrder || OUTER_CELESTIAL_NAV_DRAW_ORDER.CONNECTORS,
            });
          }
        } else if (node.connector) {
          order.push({
            nodeId,
            is: ProgressConnector,
            config: node.connector,
            drawOrder: node.connector.drawOrder || OUTER_CELESTIAL_NAV_DRAW_ORDER.CONNECTORS,
          });
        }
        if (node.node) {
          order.push({
            nodeId,
            is: NodeBackground,
            config: node.node,
            drawOrder: node.node.bgDrawOrder || OUTER_CELESTIAL_NAV_DRAW_ORDER.NODE_BG,
          });
          order.push({
            nodeId,
            is: NodeRing,
            config: node.node,
            drawOrder: node.node.drawOrder || OUTER_CELESTIAL_NAV_DRAW_ORDER.NODES,
          });
          order.push({
            nodeId,
            is: NodeOverlay,
            config: node.node,
            drawOrder: node.node.overlayDrawOrder || OUTER_CELESTIAL_NAV_DRAW_ORDER.NODE_OVERLAYS,
          });
        }
        order.sort((a, b) => a.drawOrder - b.drawOrder);
      }
      return order;
    }
  },
  created() {
    this.nodeState = Object.keys(this.db).mapToObject(
      name => name,
      () => ({
        visible: false,
        complete: 0
      })
    );
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const panLimiter = function(oldPan, newPan) {
      // In the callback context, "this" is the svgPanZoom object.
      // eslint-disable-next-line no-invalid-this
      const sizes = this.getSizes();
      const leftLimit = sizes.width - ((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom);
      const rightLimit = -sizes.viewBox.x * sizes.realZoom;
      const topLimit = sizes.height - ((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom);
      const bottomLimit = -sizes.viewBox.y * sizes.realZoom;
      return {
        x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
        y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
      };
    };
    this.panZoom = svgPanZoom(this.$refs.OutercelestialNavigationSVG, {
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      center: false,
      fit: false,
      zoomScaleSensitivity: 0.3,
      minZoom: 0.64,
      maxZoom: 1.5,
      beforePan: panLimiter,
    });
    if (CelestialNavigationViewportCache.pan) this.panZoom.pan(CelestialNavigationViewportCache.pan);
    if (CelestialNavigationViewportCache.zoom) this.panZoom.zoom(CelestialNavigationViewportCache.zoom);
  },
  beforeDestroy() {
    if (this.panZoom) {
      CelestialNavigationViewportCache.zoom = this.panZoom.getZoom();
      CelestialNavigationViewportCache.pan = this.panZoom.getPan();
      this.panZoom.destroy();
      delete this.panZoom;
    }
  },
  methods: {
    update() {
      for (const key of Object.keys(this.db)) {
        // The GameUI code forces update() to be called upon its initialization, which may force this to be called
        // before created() on this component is actually called; this suppresses any initial errors on-creation
        if (!this.nodeState) continue;
        this.nodeState[key].visible = this.db[key].visible();
        this.nodeState[key].complete = this.db[key].complete();
      }
    },
    vec(x, y) {
      return new Vector(x, y);
    },
    nodeVisibility(obj) {
      return this.nodeState[obj.nodeId].visible ? "visible" : "hidden";
    },
  }
};

export function cubicBezierArrayToPath(a, initialCommand = "M") {
  const prefix = `${initialCommand} ${a[0].p0.x} ${a[0].p0.y}\n`;
  const parts = a.map(b => `C ${b.p1.x} ${b.p1.y} ${b.p2.x} ${b.p2.y} ${b.p3.x} ${b.p3.y}\n`);
  return prefix + parts.join("");
}

const CelestialNavigationViewportCache = {
  pan: { x: 125, y: 125 },
  zoom: 0.75,
};
</script>

<template>
  <div>
    <svg
      ref="OutercelestialNavigationSVG"
      class="c-wide-canvas-element l-celestial-navigation"
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stop-color="#ffff00"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="#ff0000"
            stop-opacity="1"
          />
        </linearGradient>
        <linearGradient
          id="incompleteFade"
          x1="0"
          x2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#888"
            stop-opacity="0"
          />
          <stop
            offset="8"
            stop-color="#888"
            stop-opacity="1"
          />
        </linearGradient>
        <linearGradient
          id="fadeGrad"
          y2="0"
          x2="1"
        >
          <stop
            offset="0.5"
            stop-color="white"
            stop-opacity="0"
          />
          <stop
            offset="1"
            stop-color="white"
            stop-opacity=".5"
          />
        </linearGradient>
        <linearGradient
          id="gradTeresaEffarig"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#7851ec"
          />
          <stop
            offset="1"
            stop-color="#f0503b"
          />
        </linearGradient>
        <linearGradient
          id="gradTeresaEye"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#7851ec"
          />
          <stop
            offset="1"
            stop-color="#000000"
          />
        </linearGradient>
        <linearGradient
          id="gradEffarigEnslaved"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#f0503b"
          />
          <stop
            offset="1"
            stop-color="#ffa337"
          />
        </linearGradient>
        <linearGradient
          id="gradEnslavedV"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#ffa337"
          />
          <stop
            offset="1"
            stop-color="#ffe066"
          />
        </linearGradient>
        <linearGradient
          id="gradRaTeresa"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#7851ec"
          />
        </linearGradient>
        <linearGradient
          id="gradRaEffarig"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#f0503b"
          />
        </linearGradient>
        <linearGradient
          id="gradRaEnslaved"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#ffa337"
          />
        </linearGradient>
        <linearGradient
          id="gradRaV"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#ffe066"
          />
        </linearGradient>
        <linearGradient
          id="gradRaLaitela"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="white"
          />
        </linearGradient>
        <linearGradient
          id="gradLaitelaPelle"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="white"
          />
          <stop
            offset="1"
            stop-color="crimson"
          />
        </linearGradient>
        <mask
          id="fade"
          maskContentUnits="objectBoundingBox"
        >
          <rect
            width="1"
            height="1"
            fill="url(#fadeGrad)"
          />
        </mask>
        <filter
          id="completeGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation="2"
          />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="backgroundGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation="4"
          />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <image
        x="-250"
        y="-350"
        height="1503"
        width="1503"
        href="images/celestial-navigation-bg.webp"
      />
      <g
        v-for="(obj, index) in drawOrder"
        :key="index"
        :visibility="nodeVisibility(obj)"
      >
        <component
          :is="obj.is"
          :complete="nodeState[obj.nodeId].complete"
          v-bind="obj.config"
        />
      </g>
    </svg>
  </div>
</template>