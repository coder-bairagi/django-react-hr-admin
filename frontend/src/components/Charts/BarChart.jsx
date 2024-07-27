import { mockBarData as data } from '../../data/mockData'
import { useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { tokens } from '../../theme'
import { ResponsiveBar } from '@nivo/bar'

export const BarChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = window.innerWidth < 768;

    return (
        <ResponsiveBar
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    }
                },
                tooltip: {
                    container: {
                        color: "#141414",
                    },
                }
            }}
            keys={[
                'Hot Dog',
                'Burger',
                'Kebab',
                'Donut'
            ]}
            indexBy="Country"
            margin={{
                top: props.isDashboard ? 40 : 50,
                right: props.isDashboard ? 20 : 130,
                bottom: props.isDashboard ? 30 : 50,
                left: props.isDashboard ? 30 : 60
            }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: props.isDashboard ? undefined : 'Country',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: props.isDashboard ? undefined : 'Food',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            enableGridY={true}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={ props.isDashboard ? undefined
                : [
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: isMobile ? 'row' : 'column',
                        justify: false,
                        translateX: isMobile ? 20 : 120,
                        translateY: isMobile ? -50 : 0,
                        itemsSpacing: 2,
                        itemWidth: isMobile ? 80 : 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]
             }
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in Country: " + e.indexValue}
        />
    )
}

BarChart.propTypes = {
    isDashboard: PropTypes.bool,
}
