import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

// 用户模块 token setToken removeToken
export const useBorrowStore = defineStore('borrow-manage', () => {
  const borrow_num = ref(0)
  const setBorrowNum = (newNum) => {
    borrow_num.value = newNum
  }

  const borrow_books = ref([])
  const getBorrowBooks = async (user_id) => {
    checked.value = true
    const res = await request.get(`/borrow/getBorrowInfo?borrower_id=${user_id}`)
    borrow_books.value = res.data.data
  }
  const setBorrowBooks = () => {
    borrow_books.value = []
    checked.value = false
  }

  const checked = ref(false)

  return {
    borrow_num,
    setBorrowNum,
    borrow_books,
    getBorrowBooks,
    setBorrowBooks,
    checked
  }
})
