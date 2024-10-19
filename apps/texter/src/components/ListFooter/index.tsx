/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-10-14 21:38:56
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-14 21:52:34
 * @FilePath: /texter/apps/texter/src/components/ListFooter/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import cs from './index.module.less';

interface Props {
    loadMore: () => void;
}
/** 下拉加载监听器 */
const ListFooter: FC<Props> = ({ ...props }) => {
    const { loadMore } = props;
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio > 0) {
                    loadMore();
                }
            },
            {
                rootMargin: '200px',
            },
        );

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [domRef, loadMore]);

    return (
        <div className={cs.loadingFooter} ref={domRef}>
            <div className='i-vscode-icons:loading spin'></div>
        </div>
    );
};
export default ListFooter;
