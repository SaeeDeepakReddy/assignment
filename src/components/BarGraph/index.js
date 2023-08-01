import {Component} from 'react'
import {format} from 'date-fns'
import collect from 'collect.js'
import Cookies from 'js-cookie'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

class BarGraph extends Component {
  state = {
    barData: [],
  }

  componentDidMount() {
    this.getBarData()
  }

  getBarData = async () => {
    const userId = Cookies.get('userId')
    const role = userId === '3' ? 'admin' : 'user'
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': `${role}`,
        'x-hasura-user-id': `${userId}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.last_7_days_transactions_credit_debit_totals.map(
        each => ({
          day: format(new Date(each.date), 'E'),
          sum: each.sum,
          type: each.type,
        }),
      )
      this.setState({barData: updatedData})
    }
  }

  render() {
    const {barData} = this.state
    const creditedList = barData.map(each => {
      if (each.type === 'credit') {
        return each.sum
      }
      return 0
    })
    const debitedList = barData.map(each => {
      if (each.type === 'debit') {
        return each.sum
      }
      return 0
    })
    const credit = collect(creditedList).sum()
    const debit = collect(debitedList).sum()
    return (
      <>
        <p className="overview-desc">
          <span>${debit}</span> Debited,<span>${credit}</span> Credited in this
          week.
        </p>
        <ResponsiveContainer width="80%" height={450}>
          <BarChart
            data={barData}
            margin={{
              top: 2,
            }}
          >
            <XAxis
              dataKey="day"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              iconType="square"
              wrapperStyle={{
                padding: 10,
              }}
              verticalAlign="bottom"
              align="right"
            />
            <Bar dataKey="sum" name="Debit" fill="#4C78FF" barSize="10" />
            <Bar dataKey="sum" name="Credit" fill="#FCAA0B" barSize="20" />
          </BarChart>
        </ResponsiveContainer>
      </>
    )
  }
}

export default BarGraph
