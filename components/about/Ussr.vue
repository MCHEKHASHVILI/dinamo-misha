<template>
  <article class="collapsing-ussr d-flex align-items-center bg-color-red">
    <div class="d-flex flex-column">
      <h3 class="d-block font-size-76 font-size-52-md line-height-1-5 font-semi-bold font-color-label-white">{{ title }}</h3>
      <div class="mt-8">
        <svg
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          inkscape:version="0.91 r13725"
          sodipodi:docname="Hammer_and_sickle_red_on_transparent.svg"
          x="0px"
          y="0px"
          viewBox="0 0 414 422.2"
          style="enable-background: new 0 0 414 422.2"
          xml:space="preserve"
        >
          <path id="hammer_head" class="st0" d="M131.7,81.5l-93.3,88.8l49.7,49.7l43-43.2c83.8,85,148.9,151.1,229.8,233.2  c22.4,23.2,61.4-8.4,36.4-35.2c-85.5-83.3-144.7-143.4-233.8-230.7l52.8-53.1L131.7,81.5z" />
          <path
            id="sickle_handle"
            class="st0"
            d="M128.5,330.7C295.4,485.6,565.9,206.4,220.2,4.1l0,0c257.2,285.8,10.3,373.4-79.1,285.2  l-4.5-3.7c-3.7,4.1-7.3,8.2-11,12.3c-6.9-6.5-17.7-8.5-21,2.7c-13.6-0.9-21.6,6.6-25.2,20.7c-25.3,16.8-52.7,31.5-68.5,57.8  c-9,27.9,8.8,40,28.9,37.7c33-13.7,43.2-43.4,60.9-67.8c12.5-4,23.1-9.3,25-20.7"
          />
        </svg>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Ussr',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.collapsing-ussr {
  padding: 0 rem(350);

  @include media-breakpoint-down(md) {
    padding: rem(200) rem(24);
  }

  svg {
    width: rem(130);
    height: rem(130);
    fill: #fcd116;
  }
}
</style>
