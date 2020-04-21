export const sidebarWidth = 224;

export const gapSize = { sm: 32, md: 64 };
export const marginsSize = { sm: 32, md: 64, lg: 128 };
export const contentWidth = { sm: 650, lg: 720 };

export const breakpoints = {
  sm: marginsSize.sm + sidebarWidth + gapSize.sm + contentWidth.sm + marginsSize.sm,
  md:
    marginsSize.md +
    sidebarWidth +
    gapSize.md +
    contentWidth.sm +
    gapSize.md +
    sidebarWidth +
    marginsSize.md,
  lg:
    marginsSize.lg +
    sidebarWidth +
    gapSize.md +
    contentWidth.lg +
    gapSize.md +
    sidebarWidth +
    marginsSize.lg,
};
