import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../apis/queryKeys"
import { walkApi } from "../../apis/walk/walk"

export const useMyInformation = () => {
    const tempUserId = '3795392189';
    return useQuery({
        queryKey: queryKeys.walk.myInfo,
        queryFn: () => walkApi.getMyInformation(tempUserId)
    })
}