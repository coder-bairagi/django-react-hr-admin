import { mockLineData as data } from '../../data/mockData'
import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import PropTypes from 'prop-types'
import { tokens } from '../../theme'

export const LineChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = window.innerWidth < 768;

    return (
        <ResponsiveLine
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
            margin={
                {
                    top: (isMobile && props.isDashboard) ? 40 : 50,
                    right: props.isDashboard ? 50 : 110,
                    bottom: (isMobile && props.isDashboard) ? 70 : 50,
                    left: 60
                }
            }
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: (isMobile && props.isDashboard) ? 4 : 5,
                tickPadding: (isMobile && props.isDashboard) ? 0 : 5,
                tickRotation: isMobile ? -70 : 0,
                legend: props.isDashboard ? undefined : 'Transportation',
                legendOffset: (isMobile && !props.isDashboard) ? 45 : 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickValues: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: props.isDashboard ? undefined : 'Count',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            enableGridX={false}
            pointSize={7}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={ props.isDashboard ? undefined :
                [
                    {
                        anchor: 'top-right',
                        direction: isMobile ? 'row' : 'column',
                        justify: false,
                        translateX: isMobile ? 10 : 100,
                        translateY: isMobile ? -50 : 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]
             }
        />
    )
}

LineChart.propTypes = {
    isDashboard: PropTypes.bool,
}