import { useState, useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AuthRequired from './components/AuthRequired/AuthRequired'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Authenticated/Dashboard/Dashboard'
import Profile from './pages/Authenticated/Profile/Profile'
import CategoryDetail from './pages/Authenticated/CategoryDetail/CategoryDetail'
import QuestionOverview from './pages/Authenticated/QuestionOverview/QuestionOverview'
import AddQuestion from './pages/Authenticated/AddQuestion/AddQuestion'
import Quiz from './pages/Authenticated/Quiz/Quiz'
import QuizSummary from './pages/Authenticated/QuizSummary/QuizSummary'
import UserQuestions from './pages/Authenticated/UserQuestions/UserQuestions'
import UserQuestionsDetail from './pages/Authenticated/UserQuestionsDetail/UserQuestionsDetail'
import EditQuestion from './pages/Authenticated/EditQuestion/EditQuestion'
import Favourite from './pages/Authenticated/Favourite/Favourite'

export default function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<AuthRequired />}>
        <Route path='main' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='category/:name' element={<CategoryDetail />} />
          <Route path='category/:name/overview' element={<QuestionOverview />} />
          <Route path='category/:name/add' element={<AddQuestion />} />
          <Route path='category/:name/quiz' element={<Quiz />} />
          <Route path='category/:name/quiz/summary' element={<QuizSummary />} />
          <Route path='profile' element={<Profile />} />
          <Route path='userQuestions' element={<UserQuestions />}>
            <Route path=':name' element={<UserQuestionsDetail />} />
          </Route>
          <Route path='userQuestions/:name/edit' element={<EditQuestion />} />
          <Route path='favourite' element={<Favourite />} />
        </Route>

      </Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
