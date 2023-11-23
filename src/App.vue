<script setup>
import TheBalance from './components/TheBalance.vue';
import TheHeader from './components/TheHeader.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { toast } from 'vue3-toastify';
import { computed, ref, onMounted } from 'vue';

const transactions = ref([]);

onMounted(()=>{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if(savedTransactions){
    transactions.value = savedTransactions
  }
});

// Get Total Amount
const total = computed(()=>(
  transactions.value.reduce((acc,transaction)=>acc+transaction.amount,0)
))    
// Get Total Income 
const income = computed(()=>transactions.value.filter((transaction)=>transaction.amount>0).reduce((acc,transaction)=>acc+transaction.amount,0).toFixed(2))
// Get Expense Income 
const expense = computed(()=>transactions.value.filter((transaction)=>transaction.amount<0).reduce((acc,transaction)=>acc+transaction.amount,0).toFixed(2))

const handleTransatoinSubmitted = (transactionData) =>{
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  });
  saveToLocalStorage();
  toast.success('Data saved!');
}
// Genrate unique id
const generateUniqueId = () =>{
  return Math.floor(Math.random()*1000+1)
}

// Delete transaction
const handleTransactionDeleted =(id)=>{
  transactions.value = transactions.value.filter((transaction)=>transaction.id !== id)
  saveToLocalStorage();
  toast.success('Data removed!');
  
}
// Save transaction to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("transactions",JSON.stringify(transactions.value));
}

</script>

<template>
  <TheHeader />
  <TheBalance :total="total" />
  <IncomeExpense :income="+income" :expense="+expense" />
  <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
  <AddTransaction @transactionSubmited="handleTransatoinSubmitted" />
</template>
