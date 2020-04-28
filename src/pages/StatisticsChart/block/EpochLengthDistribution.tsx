import React, { useEffect } from 'react'
import { useAppState, useDispatch } from '../../../contexts/providers'
import i18n, { currentLanguage } from '../../../utils/i18n'
import { isMobile } from '../../../utils/screen'
import { ChartColors } from '../../../utils/const'
import { ChartLoading, ReactChartCore, ChartPage } from '../common/ChartComp'
import { AppDispatch } from '../../../contexts/reducer'
import { PageActions } from '../../../contexts/actions'
import { getStatisticEpochLengthDistribution } from '../../../service/app/charts/block'
import { localeNumberString } from '../../../utils/number'
import { handleStepGroupAxis } from '../../../utils/chart'

const gridThumbnail = {
  left: '4%',
  right: '10%',
  top: '8%',
  bottom: '6%',
  containLabel: true,
}
const grid = {
  left: '5%',
  right: '4%',
  bottom: '5%',
  containLabel: true,
}

const getOption = (
  statisticEpochLengthDistributions: State.StatisticEpochLengthDistribution[],
  isThumbnail = false,
) => {
  return {
    color: ChartColors,
    tooltip: !isThumbnail && {
      trigger: 'axis',
      formatter: (dataList: any[]) => {
        const colorSpan = (color: string) =>
          `<span style="display:inline-block;margin-right:8px;margin-left:5px;margin-bottom:2px;border-radius:10px;width:6px;height:6px;background-color:${color}"></span>`
        const widthSpan = (value: string) =>
          `<span style="width:${currentLanguage() === 'en' ? '145px' : '125px'};display:inline-block;">${value}:</span>`
        let result = `<div>${colorSpan('#333333')}${widthSpan(i18n.t('statistic.epoch_length'))} ${handleStepGroupAxis(
          dataList[0].name,
        )}</div>`
        result += `<div>${colorSpan(ChartColors[0])}${widthSpan(i18n.t('statistic.epochs'))} ${localeNumberString(
          dataList[0].data,
        )}</div>`
        return result
      },
    },
    grid: isThumbnail ? gridThumbnail : grid,
    xAxis: [
      {
        name: isMobile() || isThumbnail ? '' : i18n.t('statistic.epoch_length'),
        nameLocation: 'middle',
        nameGap: '30',
        type: 'category',
        boundaryGap: true,
        data: statisticEpochLengthDistributions.map(data => data.length),
        axisLabel: {
          formatter: (value: string) => handleStepGroupAxis(value),
        },
      },
    ],
    yAxis: [
      {
        position: 'left',
        name: isMobile() || isThumbnail ? '' : i18n.t('statistic.epochs'),
        type: 'value',
        scale: true,
        axisLine: {
          lineStyle: {
            color: ChartColors[0],
          },
        },
        axisLabel: {
          formatter: (value: string) => localeNumberString(value),
        },
      },
    ],
    series: [
      {
        name: i18n.t('statistic.epochs'),
        type: 'bar',
        yAxisIndex: '0',
        areaStyle: {
          color: '#85bae0',
        },
        barWidth: isMobile() || isThumbnail ? 10 : 30,
        data: statisticEpochLengthDistributions.map(data => data.epoch),
      },
    ],
  }
}

export const EpochLengthDistributionChart = ({
  statisticEpochLengthDistributions,
  isThumbnail = false,
}: {
  statisticEpochLengthDistributions: State.StatisticEpochLengthDistribution[]
  isThumbnail?: boolean
}) => {
  if (!statisticEpochLengthDistributions || statisticEpochLengthDistributions.length === 0) {
    return <ChartLoading show={statisticEpochLengthDistributions === undefined} isThumbnail={isThumbnail} />
  }
  return <ReactChartCore option={getOption(statisticEpochLengthDistributions, isThumbnail)} isThumbnail={isThumbnail} />
}

export const initStatisticEpochLengthDistribution = (dispatch: AppDispatch) => {
  dispatch({
    type: PageActions.UpdateStatisticEpochLengthDistribution,
    payload: {
      statisticEpochLengthDistributions: undefined,
    },
  })
}

export default () => {
  const dispatch = useDispatch()
  const { statisticEpochLengthDistributions } = useAppState()

  useEffect(() => {
    initStatisticEpochLengthDistribution(dispatch)
    getStatisticEpochLengthDistribution(dispatch)
  }, [dispatch])

  return (
    <ChartPage title={i18n.t('statistic.epoch_length_distribution')}>
      <EpochLengthDistributionChart statisticEpochLengthDistributions={statisticEpochLengthDistributions} />
    </ChartPage>
  )
}
