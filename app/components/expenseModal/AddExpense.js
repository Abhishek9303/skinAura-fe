import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/button';
import axios from 'axios';
import adminStore from '@/store/admin/adminProfile';
import { useToast } from '../../../hooks/use-toast';
import { format } from 'date-fns';

const expenseSchema = z.object({
    reason: z.string().min(1, 'Reason is required'),
    amount: z.string().min(1, 'Amount must be greater than 0'),
});

const AddExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const { admin } = adminStore();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(expenseSchema),
    });

    const fetchExpenses = async () => {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_URL}api/v1/admin/getAllExpense`,
            headers: { 
                'auth-token': admin.token, 
                'Content-Type': 'application/json'
            },
        };

        try {
            const response = await axios.request(config);
            const expensesData = response.data.data.map(expense => ({
                ...expense,
                createdAt: new Date(expense.createdAt)
            }));
            setExpenses(expensesData);
            const total = expensesData.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
            setTotalExpense(total);
        } catch (error) {
            console.error("Error fetching expenses:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const onSubmit = async (data) => {
        const newExpense = { ...data, date: new Date().toLocaleDateString() };
        setExpenses([...expenses, newExpense]);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_URL}api/v1/admin/addExpense`,
            headers: { 
                'auth-token': admin.token, 
                'Content-Type': 'application/json'
            },
            data: newExpense
        };

        try {
            const response = await axios.request(config);
            // console.log(JSON.stringify(response.data));
            toast({
                variant: "success",
                title: "Expense Added Successfully"
            });
            fetchExpenses(); // Fetch today's expenses after adding a new expense
            const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
            setTotalExpense(total);
        } catch (error) {
            console.error("Error adding expense:", error.response ? error.response.data : error.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        }
    };

    return (
      <div
        style={{
          display: "flex",
          height: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginRight: "20px", flex: 1 }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Reason
            </label>
            <input
              {...register("reason")}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.reason && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.reason.message}
              </p>
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Amount
            </label>
            <input
              type="text"
              {...register("amount")}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.amount && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.amount.message}
              </p>
            )}
          </div>
          <Button type="submit">Add Expense</Button>
        </form>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "10px" }}>Today's Expenses</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {expenses?.map((expense, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {console.log(expense,'expense')}
                {expense.reason}: &#8377;{expense?.amount} on{" "}
                {format(expense?.createdAt, "PPP")}
              </li>
            ))}
          </ul>
          <h4>Total Expense: &#8377;{totalExpense}</h4>
        </div>
      </div>
    );
};

export default AddExpense;