import ServiceDataCalculation from '../pages/serviceDataCalculation';

export interface routingProps {
    isExact: boolean;
    path: string;
    component: any;
}

const routing: routingProps[] = [
    { isExact: true, path: '/', component: ServiceDataCalculation },
];

export default routing;
