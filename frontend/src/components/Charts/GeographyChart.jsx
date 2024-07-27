import { mockGeographyData as data } from '../../data/mockData'
import { geoFeatures } from '../../data/mockGeoFeatures'
import { useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { ResponsiveChoropleth } from '@nivo/geo'
import { tokens } from '../../theme'

export const GeographyChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsiveChoropleth
            data={data}
            theme={{
                tooltip: {
                    container: {
                        color: "#141414",
                    },
                }
            }}
            features={geoFeatures.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="nivo"
            domain={[0, 1000000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={ props.isDashboard ? 40 : 150}
            projectionTranslation={ props.isDashboard ? [0.49, 0.6] : [0.5, 0.5] }
            projectionRotation={[0, 0, 0]}
            borderWidth={0.5}
            borderColor={colors.grey[100]}
            legends={
                props.isDashboard ? undefined :
                [
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: true,
                        translateX: 20,
                        translateY: -100,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemTextColor: colors.grey[100],
                        itemOpacity: 0.85,
                        symbolSize: 18,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
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

GeographyChart.propTypes = {
    isDashboard: PropTypes.bool,
}