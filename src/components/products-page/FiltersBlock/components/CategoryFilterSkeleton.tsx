import { Box, Skeleton } from "@mui/material";
import { categoryFilterSkeletonStyles } from "../FiltersBlock.styles";

export const CategoryFilterSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} sx={categoryFilterSkeletonStyles.box}>
          <Skeleton
            variant='rectangular'
            width={16}
            height={16}
            sx={categoryFilterSkeletonStyles.skeleton}
          />
          <Skeleton variant='text' width='50%' />
        </Box>
      ))}
    </>
  );
}