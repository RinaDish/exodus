<script>

    const stackedBar = {
        title: 'Taxi',
        maxValue: 1800,
        bars: [
            {
                value: 1500
            },
            {
                value: 1200,
                labelPosition: 'out-right-top',
                labelActivation: 'hover'
            },
            {
                value: 800,
                labelPosition: 'out-right-top',
                labelActivation: 'hover'
            },
            {
                value: 400,
                labelPosition: 'in-right-center',
                overlap: 'visible'
            }
        ],
        thresholds: [
            {
                value: 1500,
                color: 'black'
            },
            {
                value: 1000,
                color: 'red'
            },
            {
                value: 700,
                color: 'yellow'
            }
        ]
    }

    const percentOf = (v) => v * 100 / stackedBar.maxValue;

    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
</script>

<section class='stacked-bar'>
    <div class='title'>{stackedBar.title}</div>
    <div class='bars'>

        {#each stackedBar.bars as bar, i}
            <div class='bar' data-index={i}>

                <div class='bar__value' style='width: {percentOf(bar.value)}%; background: rgba({getRandomInt(220)}, {getRandomInt(220)}, {getRandomInt(220)}, .4);'>
                    <div class='bar__value__label {bar.labelPosition}' data-activation={bar.labelActivation}></div>
                </div>

                <div class='bar__thresholds'>
                    {#each stackedBar.thresholds as threshold, i}
                        
                        <div class='threshold' data-color={threshold.color} data-style={bar.overlap}>
                            <div class='threshold__remaining' style='width: {percentOf(threshold.value - bar.value)}%; left: {percentOf(bar.value)}%; background: {threshold.color}'></div>
                            <div class='threshold__value' style='left: {percentOf(threshold.value)}%; background: {threshold.color}' data-value={threshold.value}></div>
                            <div class='threshold__overlap'></div>
                        </div>

                    {/each}
                </div>

            </div>
        {/each}

    </div>
</section>

<style>

    .stacked-bar {
        display: flex;
        padding: 1em 0;
    }

    .title {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-family: sans-serif;
        padding: 0 1em;
        width: 30%;
    }

    .bars {
        height: 2em;
        width: 100%;
        border-radius: 8px;
        background-color: #E7F4EC;
        position: relative;
    }

    .bar {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
    }

    .bar__value {
        height: calc(100% - 4px);
        border-radius: 8px;
        position: absolute;
        top: 0;
        border: 2px solid #E7F4EC;
    }

    .bar__thresholds, .threshold  {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }

    .threshold__remaining {
        position: absolute;
        border: 2px solid transparent;
        height: calc(100% - 4px);
        opacity: 0;
    }

    .threshold__value {
        position: absolute;
        width: 4px;
        height: 110%;
        top: -5%;
        border-radius: 4px;
    }

</style>