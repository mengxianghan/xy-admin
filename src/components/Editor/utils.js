/**
 * 基础的内容样式
 * @param {*} token
 * @param {*} styles
 * @returns
 */
export const getContentStyle = (token, styles = '') => {
    return `
        .mce-content-body  {
            font-size: 14px;
            font-weight: 400;
            margin: 0;
            padding: 4px 11px !important;
            line-height: ${token.lineHeight};
            color: ${token.colorText};
        }
        .mce-content-body p {
            margin: 0;
        }
        .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
            left: 11px;
            font-size: inherit;
            color: ${token.colorTextPlaceholder};
            line-height: ${token.lineHeight};
        }
        ${styles}
    `
}
