import { mockPieData as data } from '../../data/mockData'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { ResponsivePie } from '@nivo/pie'

export const DonutChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = window.innerWidth < 768;
    let dataValuesSum = data.reduce((total, item) => total + item.value, 0);

    return (
        <ResponsivePie
            data={data}
            theme={{
                labels: {
                    text: {
                        fill: "#141414",
                    }
                },
                tooltip: {
                    container: {
                        color: "#141414",
                    },
                }
            }}
            margin={{
                top: isMobile ? 0 :  40,
                right: 80,
                bottom: isMobile ? 280 :  80,
                left: 80
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabel={(item) => {
                return ((item.value / dataValuesSum) * 100).toFixed(2)
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: isMobile ? 18 : 0,
                    translateY: isMobile ? 40 : 56,
                    itemsSpacing: isMobile ? -35 : 0,
                    itemWidth: isMobile ? 100 : 100,
                    itemHeight: 18,
                    itemTextColor: colors.grey[100],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
