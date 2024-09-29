'use client';

import { Pagination as PaginationPrimitive, PaginationProps } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';

const useStyles = createStyles(({ css }) => css``);

const Pagination = memo<PaginationProps>(({ className, ...rest }) => {
  const { cx, styles } = useStyles();

  return (
    <PaginationPrimitive
      align="center"
      className={cx(styles, className)}
      defaultCurrent={1}
      showSizeChanger
      total={0}
      {...rest}
    />
  );
});

export default Pagination;
