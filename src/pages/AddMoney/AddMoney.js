import ContainerLayout from 'layouts/Containers/ContainerLayout';
import Title from 'components/Title/Title';
import AddMoneyForm from 'containers/AddMoneyForm/AddMoneyForm';
import { useState, useEffect } from 'react';
import { CDW, CASH, ADD_MONEY } from 'constants/app-constants';
import addMoneyServices from 'services/addMoneyServices';
import { StringHelper } from 'utils/stringHelper';
/**
 * @description Add Money Page
 * @version 1.0.0
 * @author [Joel]
 */
const AddMoney = () => {
  const [data, setData] = useState();
  const [cashData, setCashData] = useState();

  /**
   * @description Fetch Bucket and set the bucket
   * @version 1.0.0
   * @return cash bucket list
   */

  const fetchBucket = async () => {
    const result = await addMoneyServices.getCashBucket();
    let buckets = result.data.data;
    setCashData(buckets);
    buckets = result.data.data.map((bucket) => {
      let cashBucket = bucket.cashType.split(' ');
      for (let i = 0; i < cashBucket.length; i++) {
        if (cashBucket[i] === CDW) {
          cashBucket[i] = StringHelper.capitalize(cashBucket[i]);
        } else {
          cashBucket[i] = StringHelper.capitalizeFirstLetter(cashBucket[i]);
        }
        return cashBucket[i] + ' ' + CASH;
      }
    });
    setData(buckets);
  };
  useEffect(() => {
    fetchBucket();
  }, []);
  return (
    <ContainerLayout>
      <Title title={ADD_MONEY} />
      <AddMoneyForm data={data} setData={setData} cashData={cashData} />
    </ContainerLayout>
  );
};

export default AddMoney;
