import { createAction } from "@reduxjs/toolkit"
import { AlertModel } from "types/interfaces"

export const openAlert = createAction<AlertModel>('shared/openAlert')
export const closeAlert = createAction('shared/closeAlert')
export const showLoader = createAction('shared/showLoader')
export const hideLoader = createAction('shared/hideLoader')