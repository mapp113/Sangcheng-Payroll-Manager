"use client";

import {useMemo, useState} from "react";
import {Pencil, Plus, Search, Trash2} from "lucide-react";

const users = [
    {
        id: "Css-1",
        name: "Nguyễn Văn An",
        role: "Admin",
        status: "Hoạt động",
        phone: "012345678",
        department: "Quản trị",
    },
    {
        id: "Css-1",
        name: "Trần Thu Hà",
        role: "HR",
        status: "Hoạt động",
        phone: "098765432",
        department: "Nhân sự",
    },
    {
        id: "Css-1",
        name: "Lê Minh Quân",
        role: "Manager",
        status: "Tạm khóa",
        phone: "0911222333",
        department: "Vận hành",
    },
    {
        id: "Css-1",
        name: "Phạm Bích Ngọc",
        role: "Employee",
        status: "Hoạt động",
        phone: "0909000111",
        department: "Kinh doanh",
    },
    {
        id: "Css-1",
        name: "Hoàng Gia Bảo",
        role: "Accountant",
        status: "Hoạt động",
        phone: "0933444555",
        department: "Tài chính",
    },
];

const roleSummaries = [
    {id: "admin", label: "Admin", total: 3},
    {id: "hr", label: "HR", total: 12},
    {id: "manager", label: "Manager", total: 6},
    {id: "employee", label: "Employee", total: 84},
];

export default function AdminPage() {
    const [filterRole, setFilterRole] = useState<string>("all");
    const [selectedUserId, setSelectedUserId] = useState<string>(users[0].id);

    const filteredUsers = useMemo(() => {
        if (filterRole === "all") return users;
        return users.filter((user) => user.role === filterRole);
    }, [filterRole]);

    return (
        <div className="flex h-full flex-col gap-4 p-4 text-[#1F2A44]">
            <header className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl font-semibold">Account Management</h1>
                    <button
                        className="inline-flex items-center gap-2 self-start rounded-full bg-[#4AB4DE] px-4 py-2 text-white transition hover:bg-[#3c9ec3]">
                        <Plus className="h-4 w-4"/>
                        Create Account
                    </button>
                </div>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {roleSummaries.map((item) => (
                    <article
                        key={item.id}
                        className="rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="mt-2 flex items-end justify-between">
                            <h3 className="text-xl font-semibold">{item.label}</h3>
                            <span className="text-3xl font-bold text-[#4AB4DE]">
                {item.total}
              </span>
                        </div>
                    </article>
                ))}
            </section>

            <div className="flex flex-1 flex-col gap-4 xl:flex-row xl:overflow-hidden">
                <section className="flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-semibold">List User</h2>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <label className="relative flex items-center">
                                <Search className="absolute left-3 h-4 w-4 text-[#94A3B8]"/>
                                <input
                                    placeholder="Tìm kiếm theo tên"
                                    className="w-full rounded-full border border-[#E2E8F0] py-2 pl-9 pr-3 text-sm focus:border-[#4AB4DE] focus:outline-none"
                                />
                            </label>
                            <select
                                value={filterRole}
                                onChange={(event) => setFilterRole(event.target.value)}
                                className="rounded-full border border-[#E2E8F0] px-4 py-2 text-sm focus:border-[#4AB4DE] focus:outline-none"
                            >
                                <option value="all">All</option>
                                <option value="Admin">Admin</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Employee">Employee</option>
                                <option value="Accountant">Accountant</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E2E8F0]">
                        <table className="min-w-full divide-y divide-[#E2E8F0] text-sm">
                            <thead className="bg-[#F8FAFC] text-left">
                            <tr>
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Position</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium text-right">Edit</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E2E8F0]">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-[#F1F5F9]"
                                    onClick={() => setSelectedUserId(user.id)}
                                >
                                    <td className="whitespace-nowrap px-4 py-3 font-medium">
                                        {user.id}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {user.role}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.status === "Hoạt động"
                                  ? "bg-[#DCFCE7] text-[#15803D]"
                                  : "bg-[#FEE2E2] text-[#B91C1C]"
                          }`}
                      >
                        {user.status}
                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-[#557099]">
                                        {user.phone}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="rounded-full border border-[#CBD5E1] p-2 text-[#475569] transition hover:border-[#4AB4DE] hover:text-[#4AB4DE]">
                                                <Pencil className="h-4 w-4"/>
                                            </button>
                                            <button
                                                className="rounded-full border border-[#FCA5A5] p-2 text-[#DC2626] transition hover:bg-[#FEE2E2]">
                                                <Trash2 className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}