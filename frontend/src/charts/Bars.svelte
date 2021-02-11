<script>
const data = {
        title: 'Taxi',
        maxValue: 1800,
        bars: [
            {
                value: 1500,
                // background: '#83C6FA',
                // limits: ['b', 'r', 'y']
            },
            {
                value: 1200,
                labelActivation: 'hover',
                // background: '#92D6A3',
                // limits: ['b', 'r', 'y']
                
            },
            {
                value: 800,
                labelActivation: 'hover',
                background: '#A597EC',
                // limits: ['b', 'r', 'y']
            },
            {
                value: 400,
                labelPosition: 'in-right',
                label: '$${value}',
                overlap: 'red',
                remaining: 'green',
                background: '#F2A68B',
                limits: ['b', 'r', 'y']
            }
        ],
        limits: [
            {
                name: 'b',
                value: 1500,
                color: 'black'
            },
            {
                name: 'r',
                value: 700,
                color: 'red'
            },
            {
                name: 'y',
                value: 200,
                color: 'yellow'
            }
        ]
    }

    const percentOf = (v) => v * 100 / data.maxValue;


</script>

<div class='wrapper'>

    <section class='bar-placeholder'>
        <div class='bar--placeholder'></div>
    </section>

    <section class='bars'>
        {#each data.bars as bar, i}
            <div class="bar--wrapper" data-index={i+1}>
                <div class='bar' style='width: {percentOf(bar.value)}%'>
                    <div class="bar--value" style='background: {bar.background}' data-label={bar.labelPosition}><span class='label'>{bar.label ? bar.label.replace('${value}', bar.value) : ''}</span></div>
                </div>
                <div class="limits">
                    {#each data.limits as limit}
                        {#if bar.limits && bar.limits.indexOf(limit.name) > -1}
                            <div class='limit' data-overlap={limit.value < bar.value} data-name={limit.name} style='left: {limit.value > bar.value ? percentOf(bar.value) : percentOf(limit.value)}%; border-color: {limit.color}; width: {limit.value > bar.value ? percentOf(limit.value - bar.value) : limit.value < bar.value ? percentOf(bar.value - limit.value): 0}%'>
                                <div class="limit-core"></div>
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
    }

    .limit {
        position: absolute;
        top: .5em;
        width: 0;
        border-right: 3px solid transparent;
        height: calc(100% - 1em);

        display: flex;
        align-items: center;
        box-sizing: border-box;
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
        background: repeating-linear-gradient(
        45deg,
        #ff000060,
        #ff000060 10px,
        #11111300 10px,
        #11111300 20px);
        opacity: .6;
    }

    .label {
        height: 2em;
        display: flex;
        padding: 0 .5em;
        align-items: center;
        font-family: monospace;
        line-height: 2em;
        font-weight: bold;
    }

    .bar--value {
        display: flex;
        align-items: center;
    }

    .bar--value[data-label*='out-bottom'] > .label {
        margin-top: 3.4em;
    }

    .bar--value[data-label*='out-top'] > .label {
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