"use client"
import React, { useEffect, useState } from 'react'

import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  BadgeDelta,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  AreaChart,
  Color,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
} from "@tremor/react";
import axios from 'axios';

export const salesPeople = [
  {
    name: "Rolley X",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Rolley Xs",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
  },
  {
    name: "Rolley Mt",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
  },
  {
    name: "Rolley Nx",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Rolley Qx",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
  },
];

const deltaTypes = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};


export default function page() {


  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState([]);
    const [loading, setLoading] = useState(true)

    const [Response, setResponse] = useState([])

    const Fetcher = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://static-api-henna.vercel.app/performance-data")
            setResponse(response.data.PerformanceData)
            setLoading(false)
        } catch (error) {

            console.log(error)
        }



    }

    useEffect(() => {
        Fetcher()
    }, [])

    console.log(Response)

  const isSalesPersonSelected = (salesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);
  return (
      <div className="mt-16 w-11/12 font-Poppins">
          <Title className=" font-Poppins text-[25px] font-bold mb-8"> Performance History </Title>

                             {loading?
              <Card className="bg-gray-300 rounded-lg animate-pulse h-[415px]"></Card>

                             :    <Card>
                                <>
                                    <div>
                                        <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                                            {/* <Icon
                                                // icon={InformationCircleIcon}
                                                variant="simple"
                                                tooltip="Shows sales performance per employee"
                                            /> */}
                                        </Flex>
                                    </div>
                                    <div className="flex space-x-2">
                                        <MultiSelect
                                            className="max-w-full sm:max-w-xs"
                                            onValueChange={setSelectedNames}
                                            placeholder="Select Model"
                                        >
                                            {Response.map((item) => (
                                                <MultiSelectItem key={item.name} value={item.name}>
                                                    {item.name}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelect>
                                        <Select
                                            className="max-w-full sm:max-w-xs"
                                            defaultValue="all"
                                            onValueChange={setSelectedStatus}
                                        >
                                            <SelectItem value="all">All Performances</SelectItem>
                                            <SelectItem value="overperforming">Overperforming</SelectItem>
                                            <SelectItem value="average">Average</SelectItem>
                                            <SelectItem value="underperforming">Underperforming</SelectItem>
                                        </Select>
                                    </div>
                                    <Table className="mt-6">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell>Name</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Leads</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Sales ($)</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Quota ($)</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Variance</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Region</TableHeaderCell>
                                                <TableHeaderCell className="text-right">Status</TableHeaderCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            
                                            {Response
                                                .filter((item) => isSalesPersonSelected(item))
                                                .map((item) => (
                                                    <TableRow key={item.name}>
                                                        <TableCell className=''>{item.name}</TableCell>
                                                        <TableCell className="text-right">{item.leads}</TableCell>
                                                        <TableCell className="text-right">{item.sales}</TableCell>
                                                        <TableCell className="text-right">{item.quota}</TableCell>
                                                        <TableCell className="text-right">{item.variance}</TableCell>
                                                        <TableCell className="text-right">{item.region}</TableCell>
                                                        <TableCell className="text-right">
                                                            <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                                                                {item.status}
                                                            </BadgeDelta>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </>
                            </Card>}
                        
                        </div> 
  )
}
