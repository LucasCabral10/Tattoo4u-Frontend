import { Skeleton } from "@mui/material"

export function LoadingForm() {
  return(
    <>
    <Skeleton variant="rounded" width="100%" height={60} sx={{ margin: '16px 0' }} />
    <Skeleton variant="rounded" width="100%" height={60} sx={{ margin: '16px 0' }} />
    <Skeleton variant="rounded" width="100%" height={60} sx={{ margin: '16px 0' }} />
    </>
   )
}