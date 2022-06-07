import { RootState } from "app/store"

export const isAlertOpen = (state: RootState) => state.shared.isAlertOpen
export const getAlertMessage = (state: RootState) => state.shared.message
export const getAlertType = (state: RootState) => state.shared.type
export const isLoading = (state: RootState) => state.shared.isLoading
