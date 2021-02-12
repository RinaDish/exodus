<script>
import { onMount } from "svelte";



const data = {
        title: 'Taxi',
        maxValue: 1800,
        bars: [
            {
                value: 1500,
                background: '#83C6FA',
                labelPosition: 'in-right',
                detailedLabel: 'previous-previous-previous: $${value}',
                limits: ['b', 'r', 'y']
            },
            {
                value: 1200,
                labelActivation: 'hover',
                background: '#92D6A3',
                labelPosition: 'in-right',
                detailedLabel: 'previous-previous: $${value}',
                limits: ['b', 'r', 'y']
                
            },
            {
                value: 800,
                labelActivation: 'hover',
                background: '#A597EC',
                labelPosition: 'in-right',
                detailedLabel: 'previous: $${value}',
                limits: ['b', 'r', 'y']
            },
            {
                value: 400,
                labelPosition: 'in-right',
                label: '$${value}',
                detailedLabel: 'current: $${value}',
                background: '#F2A68B',
                limits: ['b', 'r', 'y']
            }
        ],
        limits: [
            {
                name: 'b',
                value: 1300,
                color: '#777777',
                visible: 'hover',
                overlapStyle: 'stripes'
            },
            {
                name: 'r',
                value: 700,
                color: '#FF778D',
                visible: 'hover',
                overlapStyle: 'stripes',
                // visible: 'static'
            },
            {
                name: 'y',
                value: 200,
                color: '#F5BD77',
                overlapStyle: 'stripes'
            }
        ]
    }

    // onMount(() => {
    //     setTimeout(() => {
    //         data.limits[data.limits.length - 1].value = 1500;
    //     }, 1000)
    // })

    const percentOf = (v) => v * 100 / data.maxValue;
    let isDetailed = false;

    const styledOverlap = (c, b, style) => {
        if (style == 'stripes')
            return `background: repeating-linear-gradient(45deg, ${c}, ${c} 10px, ${b} 10px, ${b} 20px);`
        return `background: ${c}`;
    }
    const styledZIndex = (isOverlap, index) => isOverlap ? `z-index: ${100 - index}` : '';

</script>

<div class='wrapper' on:dblclick={() => isDetailed = !isDetailed}>

    <section class='bar-placeholder'>
        <div class='bar--placeholder'></div>
    </section>

    <section class='bars'>
        {#each data.bars as bar, i}
            <div class="bar--wrapper" class:detailed={isDetailed} style='top: {isDetailed ? i * 60: 0}%' data-index={i+1} class:upperLayer={i === data.bars.length - 1}>
                <div class='bar' style='width: {percentOf(bar.value)}%'>
                    <div class="bar--value" style='background: {bar.background}' data-label={bar.labelPosition}>
                        <span class='label'>{bar.label ? bar.label.replace('${value}', bar.value) : ''}</span>
                        <span class='label--detailed'>{bar.detailedLabel ? bar.detailedLabel.replace('${value}', bar.value) : ''}</span>
                    </div>
                </div>
                <div class="limits">
                    {#each data.limits as limit, limI}
                        {#if bar.limits && bar.limits.indexOf(limit.name) > -1}
                            <div class='limit' data-overlap={limit.value < bar.value} data-name={limit.name} style='{styledZIndex(limit.value < bar.value, limI)}; left: {limit.value > bar.value ? percentOf(bar.value) : percentOf(limit.value)}%; border-color: {limit.color}; width: {limit.value > bar.value ? percentOf(limit.value - bar.value) : limit.value < bar.value ? percentOf(bar.value - limit.value): 0}%'>
                                <div class="limit-core" style='{limit.value < bar.value ? styledOverlap(limit.color, bar.background, limit.overlapStyle) : ''}'>
                                    {#if limit.value > bar.value}
                                        <div class='remaining-wrap {limit.visible}' style='border-color: {bar.background};'>
                                            <div class="remaining" data-value='${limit.value - bar.value}' style='border-color: {bar.background};'></div>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    </section>

</div>

<style>

    .wrapper {
        position: relative;
        width: 100%;
        user-select: none;
    }

    .bar-placeholder {
        position: relative;
        top: 0;
        max-width: 100%;
        height: 2em;
        padding: 1em 0;
    }

    .bar--placeholder {
        height: 2em;
        border-radius: .5em;
        background-color: #EDF8F4;
    }

    .bars {
        position: absolute;
        top: 0;
        height: 4em;
        width: 100%;
        display: flex;
        box-sizing: border-box;
    }

    .bar--wrapper {
        position: absolute;
        height: 100%;
        width: 100%;
        transition: top .3s;
    }

    .bar--wrapper:not([data-index='1']) {
        /* margin-top: -1em; */
    }

    .bar {
        height: 100%;
        position: absolute;
        top: 0;
    }

    .bar--value {
        width: 100%;
        height: 2em;
        margin: 1em 0;
        border-radius: .5em;
    }

    .limits {
        height: 100%;
        width: 100%;
        visibility: hidden;
    }

    .bar--wrapper.upperLayer > .limits,
    .bar--wrapper.detailed > .limits {
        visibility: visible;
    }

    .bar--wrapper.detailed > .limits > .limit[data-overlap='false'] {
        box-sizing: content-box;
    }

    .limit {
        position: absolute;
        top: .75em;
        width: 0;
        border-right: 3px solid transparent;
        height: calc(100% - 1.5em);

        display: flex;
        align-items: center;
        box-sizing: border-box;

        transition: left .3s, width .3s;
    }
    .limit[data-overlap='true'] {
        border-right: none;
        border-left: 3px solid transparent;
    }

    .limit-core {
        width: 100%;
        height: 2em;
    }

    .limit[data-overlap='true'] > .limit-core {
        border-radius: 0 .5em .5em 0;
        /* background: repeating-linear-gradient(
        45deg,
        #ff0000,
        #ff0000 10px,
        #11111300 10px,
        #11111300 20px); */
    }

    .remaining-wrap {
        display: flex;
        height: 1em;
        margin: .5em .2em;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        visibility: hidden;
        z-index: 100;
    }

    .remaining {
        height: 0px;
        width: 100%;
        border-top: 2px dashed transparent;
        margin-top: calc(.5em - 1px);
        display: flex;
        justify-content: center;
    }

    .remaining::after {
        content: attr(data-value);
        position: absolute;
        height: 2em;
        display: flex;
        align-items: center;
        font-weight: bold;
        top: -.1em;
        font-family: monospace;
    }

    .limit[data-overlap='false']:hover > .limit-core > .remaining-wrap.hover,
    .remaining-wrap.static {
        visibility: visible;
    }

    .label,
    .label--detailed {
        height: 2em;
        display: flex;
        padding: 0 .5em;
        align-items: center;
        font-family: monospace;
        line-height: 2em;
        font-weight: bold;
        z-index: 200;
    }

    .label--detailed,
    .bar--wrapper.detailed > .bar > .bar--value > .label {
        display: none;
    }


    .bar--wrapper.detailed > .bar > .bar--value > .label--detailed {
        display: block;
    }

    .bar--value {
        display: flex;
        align-items: center;
    }

    .bar--value[data-label*='out-bottom'] > .label,
    .bar--value[data-label*='out-bottom'] > .label--detailed {
        margin-top: 3.4em;
    }

    .bar--value[data-label*='out-top'] > .label,
    .bar--value[data-label*='out-top'] > .label--detailed {
        margin-top: -3.4em;
    }

    .bar--value[data-label$='-left'] {
        justify-content: flex-start;
    }

    .bar--value[data-label$='-right'] {
        justify-content: flex-end;
    }

    .bar--value[data-label$='-center'] {
        justify-content: center;
    }

</style>