import { getDataForChart } from "@/axios/query.axios";
import {
  setFrequentlyBought,
  setItemsByCat,
  setOrderSalesQtyByDate,
  setStatusCount,
  setTotalSales,
  setorderStatusCount,
} from "@/redux/chart.data";
import { AppDispatch } from "@/store";
import { IitemsByCat } from "@/types";

export const getChartDataAction = () => async (dispatch: AppDispatch) => {
  const { status, chartData } = await getDataForChart();
  if (status === "success") {
    chartData?.itemsByCategory.length &&
      dispatch(setItemsByCat(chartData.itemsByCategory as IitemsByCat[]));
    chartData?.orderSalesByDate.length &&
      dispatch(setOrderSalesQtyByDate(chartData.orderSalesByDate));
    chartData?.activeAndInactiveProducts.length &&
      dispatch(setStatusCount(chartData.activeAndInactiveProducts));
    chartData?.orderStatusCount.length &&
      dispatch(setorderStatusCount(chartData.orderStatusCount));
    chartData?.frequentyBought.length &&
      dispatch(setFrequentlyBought(chartData.frequentyBought));
    chartData?.totalSalesByDate.length &&
      dispatch(setTotalSales(chartData.totalSalesByDate));
  }
};
