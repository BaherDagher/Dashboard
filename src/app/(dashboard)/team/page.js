"use client";
import React from "react";
import { useState } from "react";
import { teamData } from "@/Data/TeamData/TeamData";
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#e5e7eb",
      color: "#374151",
      fontWeight: "600",
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "50px",
      "&:hover": {
        backgroundColor: "#f9fafb",
      },
      wordBreak: "break-word",
    },
  },
  cells: {
    style: {
      borderBottom: "1px solid #e5e7eb",
    },
  },
};

const columns = [
  { name: "ID", selector: (row) => row.ID, sortable: true, center: true },
  { name: "Name", selector: (row) => row.Name, sortable: true, center: true },
  { name: "Email", selector: (row) => row.Email, sortable: true, center: true },
  {
    name: "Phone",
    selector: (row) => row.PhoneNumber,
    sortable: true,
    center: true,
  },
  {
    name: "Address",
    selector: (row) => row.Address,
    sortable: true,
    center: true,
  },
  { name: "City", selector: (row) => row.City, sortable: true, center: true },
];

const TeamPage = () => {
  const [filterText, setFilterText] = useState("");
  const [filterColumn, setFilterColumn] = useState("Name");

  const handleFilter = (item) => {
    const value = filterText.toLowerCase();
    const field = item[filterColumn]?.toLowerCase?.();
    return field?.includes(value);
  };

  const filteredItems = teamData.filter(handleFilter);

  return (
    <div className="pl-20 pt-20">
      <div className="pt-8 pb-4 px-4 md:px-8 bg-white rounded shadow overflow-x-auto text-center">
        <DataTable
          title={<span className="font-bold">Team Members</span>}
          columns={columns}
          data={filteredItems}
          pagination
          responsive
          customStyles={customStyles}
          subHeader
          subHeaderComponent={
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full justify-end mb-4">
              <select
                className="sm:w-40 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
              >
                <option value="Name">Name</option>
                <option value="Email">Email</option>
                <option value="PhoneNumber">Phone</option>
                <option value="Address">Address</option>
                <option value="City">City</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${filterColumn}`}
                className="sm:w-72 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TeamPage;
