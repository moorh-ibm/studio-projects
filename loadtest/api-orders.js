import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
  export const options = {
  scenarios: {
    constant_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 2 },
        { duration: '10s', target: 5 },
      ],      
    },
  },
  insecureSkipTLSVerify: true,  // skip TLS certificate verification
  //gracefulStop: '5s',
  thresholds: {
    'http_req_duration': ['p(90)<10000'] // 90% of requests complete in < 10s
  },
  }
export default function () {
    const url = 'https://order-sandbox-ricky.api-n-ea7a.us-east-b.apiconnect.ibmappdomain.cloud/1.0/orders/order/ORDER-000'
    const res = http.get(url);
    check(res, {
      'HTTP 200': (r) => r.status == 200
    });
}
