<script setup>
  import {defineProps,defineEmits} from 'vue'
   defineProps({
    transactions:{
      type: Array,
      required: true,
    }
  });

  const emit = defineEmits(["transactionDeleted"]);

  const handleDelete=(id)=>{
   emit('transactionDeleted', id);
  }

</script>
<template>
    <h3>History</h3>
    <ul id="list" class="list">

      <li v-for="transaction in transactions" v-bind:key="transaction.id" :class="transaction.amount>0?'plus':'minus'">
        {{ transaction.text }} 
        <span>${{ transaction.amount }}</span>
        <button class="delete-btn" @click.prevent="handleDelete(transaction.id)">
          x
        </button>
      </li>

    </ul>
</template>
