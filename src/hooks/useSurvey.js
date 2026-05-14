import { useContext } from 'react'
import { SurveyContext } from '../context/SurveyContext'

export const useSurvey = () => useContext(SurveyContext)