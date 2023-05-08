import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import GreetingCard from 'components/GreetingCard/GreetingCard';
const Dashboard = () => {
  return (
    <ContainerLayout>
      <Title title={`Dashboard`} />
      <GreetingCard />
    </ContainerLayout>
  );
};
export default Dashboard;
