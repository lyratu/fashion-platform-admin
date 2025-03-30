export declare function useTable(props: any): {
    Table: import('vue').Ref<import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]>;
            default: () => never[];
        };
        size: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        width: (NumberConstructor | StringConstructor)[];
        height: (NumberConstructor | StringConstructor)[];
        maxHeight: (NumberConstructor | StringConstructor)[];
        fit: {
            type: BooleanConstructor;
            default: boolean;
        };
        stripe: BooleanConstructor;
        border: BooleanConstructor;
        rowKey: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowKey"]>;
        showHeader: {
            type: BooleanConstructor;
            default: boolean;
        };
        showSummary: BooleanConstructor;
        sumText: StringConstructor;
        summaryMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["summaryMethod"]>;
        rowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowClassName"]>;
        rowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowStyle"]>;
        cellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellClassName"]>;
        cellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellStyle"]>;
        headerRowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowClassName"]>;
        headerRowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowStyle"]>;
        headerCellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellClassName"]>;
        headerCellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellStyle"]>;
        highlightCurrentRow: BooleanConstructor;
        currentRowKey: (NumberConstructor | StringConstructor)[];
        emptyText: StringConstructor;
        expandRowKeys: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["expandRowKeys"]>;
        defaultExpandAll: BooleanConstructor;
        defaultSort: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["defaultSort"]>;
        tooltipEffect: StringConstructor;
        tooltipOptions: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipOptions"]>;
        spanMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["spanMethod"]>;
        selectOnIndeterminate: {
            type: BooleanConstructor;
            default: boolean;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        treeProps: {
            type: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["treeProps"]>;
            default: () => {
                hasChildren: string;
                children: string;
                checkStrictly: boolean;
            };
        };
        lazy: BooleanConstructor;
        load: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["load"]>;
        style: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: () => {};
        };
        className: {
            type: StringConstructor;
            default: string;
        };
        tableLayout: {
            type: import('vue').PropType<"fixed" | "auto">;
            default: string;
        };
        scrollbarAlwaysOn: BooleanConstructor;
        flexible: BooleanConstructor;
        showOverflowTooltip: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["showOverflowTooltip"]>;
        tooltipFormatter: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipFormatter"]>;
        appendFilterPanelTo: StringConstructor;
        scrollbarTabindex: {
            type: (NumberConstructor | StringConstructor)[];
            default: undefined;
        };
        allowDragLastColumn: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onScroll?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
    }, {
        ns: {
            namespace: import('vue').ComputedRef<string>;
            b: (blockSuffix?: string) => string;
            e: (element?: string) => string;
            m: (modifier?: string) => string;
            be: (blockSuffix?: string, element?: string) => string;
            em: (element?: string, modifier?: string) => string;
            bm: (blockSuffix?: string, modifier?: string) => string;
            bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
            is: {
                (name: string, state: boolean | undefined): string;
                (name: string): string;
            };
            cssVar: (object: Record<string, string>) => Record<string, string>;
            cssVarName: (name: string) => string;
            cssVarBlock: (object: Record<string, string>) => Record<string, string>;
            cssVarBlockName: (name: string) => string;
        };
        layout: import('element-plus/es/components/table/src/table-layout.mjs').default<any>;
        store: any;
        columns: import('vue').ComputedRef<import('element-plus').TableColumnCtx<unknown>>;
        handleHeaderFooterMousewheel: (event: any, data: any) => void;
        handleMouseLeave: () => void;
        tableId: string;
        tableSize: import('vue').ComputedRef<"" | "small" | "default" | "large">;
        isHidden: import('vue').Ref<boolean>;
        isEmpty: import('vue').ComputedRef<boolean>;
        renderExpanded: import('vue').Ref<null>;
        resizeProxyVisible: import('vue').Ref<boolean>;
        resizeState: import('vue').Ref<{
            width: null | number;
            height: null | number;
            headerHeight: null | number;
        }>;
        isGroup: import('vue').Ref<boolean>;
        bodyWidth: import('vue').ComputedRef<string>;
        tableBodyStyles: import('vue').ComputedRef<{
            width: string;
        }>;
        emptyBlockStyle: import('vue').ComputedRef<{
            width: string;
            height: string;
        } | null>;
        debouncedUpdateLayout: import('lodash-es').DebouncedFunc<() => void>;
        handleFixedMousewheel: (event: any, data: any) => void;
        setCurrentRow: (row: any) => void;
        getSelectionRows: () => any;
        toggleRowSelection: (row: any, selected?: boolean, ignoreSelectable?: boolean) => void;
        clearSelection: () => void;
        clearFilter: (columnKeys?: string[]) => void;
        toggleAllSelection: () => void;
        toggleRowExpansion: (row: any, expanded?: boolean) => void;
        clearSort: () => void;
        doLayout: () => void;
        sort: (prop: string, order: string) => void;
        updateKeyChildren: (key: string, data: any[]) => void;
        t: import('element-plus').Translator;
        setDragVisible: (visible: boolean) => void;
        context: import('element-plus').Table<any>;
        computedSumText: import('vue').ComputedRef<string>;
        computedEmptyText: import('vue').ComputedRef<string>;
        tableLayout: import('vue').ComputedRef<("fixed" | "auto") | undefined>;
        scrollbarViewStyle: {
            display: string;
            verticalAlign: string;
        };
        scrollbarStyle: import('vue').ComputedRef<{
            height: string;
            maxHeight?: undefined;
        } | {
            maxHeight: string;
            height?: undefined;
        } | {
            height?: undefined;
            maxHeight?: undefined;
        }>;
        scrollBarRef: import('vue').Ref<any>;
        scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
        setScrollLeft: (left?: number) => void;
        setScrollTop: (top?: number) => void;
        allowDragLastColumn: boolean;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("select" | "scroll" | "selection-change" | "sort-change" | "select-all" | "expand-change" | "current-change" | "cell-mouse-enter" | "cell-mouse-leave" | "cell-contextmenu" | "cell-click" | "cell-dblclick" | "row-click" | "row-contextmenu" | "row-dblclick" | "header-click" | "header-contextmenu" | "filter-change" | "header-dragend")[], import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, {
        data: any[];
        style: import('vue').CSSProperties;
        tableLayout: "fixed" | "auto";
        border: boolean;
        className: string;
        fit: boolean;
        lazy: boolean;
        scrollbarAlwaysOn: boolean;
        allowDragLastColumn: boolean;
        stripe: boolean;
        treeProps: import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps | undefined;
        showHeader: boolean;
        showSummary: boolean;
        highlightCurrentRow: boolean;
        defaultExpandAll: boolean;
        selectOnIndeterminate: boolean;
        indent: number;
        flexible: boolean;
        scrollbarTabindex: string | number;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]>;
            default: () => never[];
        };
        size: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        width: (NumberConstructor | StringConstructor)[];
        height: (NumberConstructor | StringConstructor)[];
        maxHeight: (NumberConstructor | StringConstructor)[];
        fit: {
            type: BooleanConstructor;
            default: boolean;
        };
        stripe: BooleanConstructor;
        border: BooleanConstructor;
        rowKey: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowKey"]>;
        showHeader: {
            type: BooleanConstructor;
            default: boolean;
        };
        showSummary: BooleanConstructor;
        sumText: StringConstructor;
        summaryMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["summaryMethod"]>;
        rowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowClassName"]>;
        rowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowStyle"]>;
        cellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellClassName"]>;
        cellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellStyle"]>;
        headerRowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowClassName"]>;
        headerRowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowStyle"]>;
        headerCellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellClassName"]>;
        headerCellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellStyle"]>;
        highlightCurrentRow: BooleanConstructor;
        currentRowKey: (NumberConstructor | StringConstructor)[];
        emptyText: StringConstructor;
        expandRowKeys: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["expandRowKeys"]>;
        defaultExpandAll: BooleanConstructor;
        defaultSort: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["defaultSort"]>;
        tooltipEffect: StringConstructor;
        tooltipOptions: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipOptions"]>;
        spanMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["spanMethod"]>;
        selectOnIndeterminate: {
            type: BooleanConstructor;
            default: boolean;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        treeProps: {
            type: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["treeProps"]>;
            default: () => {
                hasChildren: string;
                children: string;
                checkStrictly: boolean;
            };
        };
        lazy: BooleanConstructor;
        load: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["load"]>;
        style: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: () => {};
        };
        className: {
            type: StringConstructor;
            default: string;
        };
        tableLayout: {
            type: import('vue').PropType<"fixed" | "auto">;
            default: string;
        };
        scrollbarAlwaysOn: BooleanConstructor;
        flexible: BooleanConstructor;
        showOverflowTooltip: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["showOverflowTooltip"]>;
        tooltipFormatter: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipFormatter"]>;
        appendFilterPanelTo: StringConstructor;
        scrollbarTabindex: {
            type: (NumberConstructor | StringConstructor)[];
            default: undefined;
        };
        allowDragLastColumn: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onScroll?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
    }, {
        ns: {
            namespace: import('vue').ComputedRef<string>;
            b: (blockSuffix?: string) => string;
            e: (element?: string) => string;
            m: (modifier?: string) => string;
            be: (blockSuffix?: string, element?: string) => string;
            em: (element?: string, modifier?: string) => string;
            bm: (blockSuffix?: string, modifier?: string) => string;
            bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
            is: {
                (name: string, state: boolean | undefined): string;
                (name: string): string;
            };
            cssVar: (object: Record<string, string>) => Record<string, string>;
            cssVarName: (name: string) => string;
            cssVarBlock: (object: Record<string, string>) => Record<string, string>;
            cssVarBlockName: (name: string) => string;
        };
        layout: import('element-plus/es/components/table/src/table-layout.mjs').default<any>;
        store: any;
        columns: import('vue').ComputedRef<import('element-plus').TableColumnCtx<unknown>>;
        handleHeaderFooterMousewheel: (event: any, data: any) => void;
        handleMouseLeave: () => void;
        tableId: string;
        tableSize: import('vue').ComputedRef<"" | "small" | "default" | "large">;
        isHidden: import('vue').Ref<boolean>;
        isEmpty: import('vue').ComputedRef<boolean>;
        renderExpanded: import('vue').Ref<null>;
        resizeProxyVisible: import('vue').Ref<boolean>;
        resizeState: import('vue').Ref<{
            width: null | number;
            height: null | number;
            headerHeight: null | number;
        }>;
        isGroup: import('vue').Ref<boolean>;
        bodyWidth: import('vue').ComputedRef<string>;
        tableBodyStyles: import('vue').ComputedRef<{
            width: string;
        }>;
        emptyBlockStyle: import('vue').ComputedRef<{
            width: string;
            height: string;
        } | null>;
        debouncedUpdateLayout: import('lodash-es').DebouncedFunc<() => void>;
        handleFixedMousewheel: (event: any, data: any) => void;
        setCurrentRow: (row: any) => void;
        getSelectionRows: () => any;
        toggleRowSelection: (row: any, selected?: boolean, ignoreSelectable?: boolean) => void;
        clearSelection: () => void;
        clearFilter: (columnKeys?: string[]) => void;
        toggleAllSelection: () => void;
        toggleRowExpansion: (row: any, expanded?: boolean) => void;
        clearSort: () => void;
        doLayout: () => void;
        sort: (prop: string, order: string) => void;
        updateKeyChildren: (key: string, data: any[]) => void;
        t: import('element-plus').Translator;
        setDragVisible: (visible: boolean) => void;
        context: import('element-plus').Table<any>;
        computedSumText: import('vue').ComputedRef<string>;
        computedEmptyText: import('vue').ComputedRef<string>;
        tableLayout: import('vue').ComputedRef<("fixed" | "auto") | undefined>;
        scrollbarViewStyle: {
            display: string;
            verticalAlign: string;
        };
        scrollbarStyle: import('vue').ComputedRef<{
            height: string;
            maxHeight?: undefined;
        } | {
            maxHeight: string;
            height?: undefined;
        } | {
            height?: undefined;
            maxHeight?: undefined;
        }>;
        scrollBarRef: import('vue').Ref<any>;
        scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
        setScrollLeft: (left?: number) => void;
        setScrollTop: (top?: number) => void;
        allowDragLastColumn: boolean;
    }, {}, {}, {}, {
        data: any[];
        style: import('vue').CSSProperties;
        tableLayout: "fixed" | "auto";
        border: boolean;
        className: string;
        fit: boolean;
        lazy: boolean;
        scrollbarAlwaysOn: boolean;
        allowDragLastColumn: boolean;
        stripe: boolean;
        treeProps: import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps | undefined;
        showHeader: boolean;
        showSummary: boolean;
        highlightCurrentRow: boolean;
        defaultExpandAll: boolean;
        selectOnIndeterminate: boolean;
        indent: number;
        flexible: boolean;
        scrollbarTabindex: string | number;
    }>, import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]>;
            default: () => never[];
        };
        size: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        width: (NumberConstructor | StringConstructor)[];
        height: (NumberConstructor | StringConstructor)[];
        maxHeight: (NumberConstructor | StringConstructor)[];
        fit: {
            type: BooleanConstructor;
            default: boolean;
        };
        stripe: BooleanConstructor;
        border: BooleanConstructor;
        rowKey: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowKey"]>;
        showHeader: {
            type: BooleanConstructor;
            default: boolean;
        };
        showSummary: BooleanConstructor;
        sumText: StringConstructor;
        summaryMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["summaryMethod"]>;
        rowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowClassName"]>;
        rowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowStyle"]>;
        cellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellClassName"]>;
        cellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellStyle"]>;
        headerRowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowClassName"]>;
        headerRowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowStyle"]>;
        headerCellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellClassName"]>;
        headerCellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellStyle"]>;
        highlightCurrentRow: BooleanConstructor;
        currentRowKey: (NumberConstructor | StringConstructor)[];
        emptyText: StringConstructor;
        expandRowKeys: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["expandRowKeys"]>;
        defaultExpandAll: BooleanConstructor;
        defaultSort: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["defaultSort"]>;
        tooltipEffect: StringConstructor;
        tooltipOptions: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipOptions"]>;
        spanMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["spanMethod"]>;
        selectOnIndeterminate: {
            type: BooleanConstructor;
            default: boolean;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        treeProps: {
            type: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["treeProps"]>;
            default: () => {
                hasChildren: string;
                children: string;
                checkStrictly: boolean;
            };
        };
        lazy: BooleanConstructor;
        load: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["load"]>;
        style: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: () => {};
        };
        className: {
            type: StringConstructor;
            default: string;
        };
        tableLayout: {
            type: import('vue').PropType<"fixed" | "auto">;
            default: string;
        };
        scrollbarAlwaysOn: BooleanConstructor;
        flexible: BooleanConstructor;
        showOverflowTooltip: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["showOverflowTooltip"]>;
        tooltipFormatter: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipFormatter"]>;
        appendFilterPanelTo: StringConstructor;
        scrollbarTabindex: {
            type: (NumberConstructor | StringConstructor)[];
            default: undefined;
        };
        allowDragLastColumn: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onScroll?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
    }, {
        ns: {
            namespace: import('vue').ComputedRef<string>;
            b: (blockSuffix?: string) => string;
            e: (element?: string) => string;
            m: (modifier?: string) => string;
            be: (blockSuffix?: string, element?: string) => string;
            em: (element?: string, modifier?: string) => string;
            bm: (blockSuffix?: string, modifier?: string) => string;
            bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
            is: {
                (name: string, state: boolean | undefined): string;
                (name: string): string;
            };
            cssVar: (object: Record<string, string>) => Record<string, string>;
            cssVarName: (name: string) => string;
            cssVarBlock: (object: Record<string, string>) => Record<string, string>;
            cssVarBlockName: (name: string) => string;
        };
        layout: import('element-plus/es/components/table/src/table-layout.mjs').default<any>;
        store: any;
        columns: import('vue').ComputedRef<import('element-plus').TableColumnCtx<unknown>>;
        handleHeaderFooterMousewheel: (event: any, data: any) => void;
        handleMouseLeave: () => void;
        tableId: string;
        tableSize: import('vue').ComputedRef<"" | "small" | "default" | "large">;
        isHidden: import('vue').Ref<boolean>;
        isEmpty: import('vue').ComputedRef<boolean>;
        renderExpanded: import('vue').Ref<null>;
        resizeProxyVisible: import('vue').Ref<boolean>;
        resizeState: import('vue').Ref<{
            width: null | number;
            height: null | number;
            headerHeight: null | number;
        }>;
        isGroup: import('vue').Ref<boolean>;
        bodyWidth: import('vue').ComputedRef<string>;
        tableBodyStyles: import('vue').ComputedRef<{
            width: string;
        }>;
        emptyBlockStyle: import('vue').ComputedRef<{
            width: string;
            height: string;
        } | null>;
        debouncedUpdateLayout: import('lodash-es').DebouncedFunc<() => void>;
        handleFixedMousewheel: (event: any, data: any) => void;
        setCurrentRow: (row: any) => void;
        getSelectionRows: () => any;
        toggleRowSelection: (row: any, selected?: boolean, ignoreSelectable?: boolean) => void;
        clearSelection: () => void;
        clearFilter: (columnKeys?: string[]) => void;
        toggleAllSelection: () => void;
        toggleRowExpansion: (row: any, expanded?: boolean) => void;
        clearSort: () => void;
        doLayout: () => void;
        sort: (prop: string, order: string) => void;
        updateKeyChildren: (key: string, data: any[]) => void;
        t: import('element-plus').Translator;
        setDragVisible: (visible: boolean) => void;
        context: import('element-plus').Table<any>;
        computedSumText: import('vue').ComputedRef<string>;
        computedEmptyText: import('vue').ComputedRef<string>;
        tableLayout: import('vue').ComputedRef<("fixed" | "auto") | undefined>;
        scrollbarViewStyle: {
            display: string;
            verticalAlign: string;
        };
        scrollbarStyle: import('vue').ComputedRef<{
            height: string;
            maxHeight?: undefined;
        } | {
            maxHeight: string;
            height?: undefined;
        } | {
            height?: undefined;
            maxHeight?: undefined;
        }>;
        scrollBarRef: import('vue').Ref<any>;
        scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
        setScrollLeft: (left?: number) => void;
        setScrollTop: (top?: number) => void;
        allowDragLastColumn: boolean;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("select" | "scroll" | "selection-change" | "sort-change" | "select-all" | "expand-change" | "current-change" | "cell-mouse-enter" | "cell-mouse-leave" | "cell-contextmenu" | "cell-click" | "cell-dblclick" | "row-click" | "row-contextmenu" | "row-dblclick" | "header-click" | "header-contextmenu" | "filter-change" | "header-dragend")[], import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, {
        data: any[];
        style: import('vue').CSSProperties;
        tableLayout: "fixed" | "auto";
        border: boolean;
        className: string;
        fit: boolean;
        lazy: boolean;
        scrollbarAlwaysOn: boolean;
        allowDragLastColumn: boolean;
        stripe: boolean;
        treeProps: import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps | undefined;
        showHeader: boolean;
        showSummary: boolean;
        highlightCurrentRow: boolean;
        defaultExpandAll: boolean;
        selectOnIndeterminate: boolean;
        indent: number;
        flexible: boolean;
        scrollbarTabindex: string | number;
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow[]>;
            default: () => never[];
        };
        size: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        width: (NumberConstructor | StringConstructor)[];
        height: (NumberConstructor | StringConstructor)[];
        maxHeight: (NumberConstructor | StringConstructor)[];
        fit: {
            type: BooleanConstructor;
            default: boolean;
        };
        stripe: BooleanConstructor;
        border: BooleanConstructor;
        rowKey: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowKey"]>;
        showHeader: {
            type: BooleanConstructor;
            default: boolean;
        };
        showSummary: BooleanConstructor;
        sumText: StringConstructor;
        summaryMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["summaryMethod"]>;
        rowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowClassName"]>;
        rowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["rowStyle"]>;
        cellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellClassName"]>;
        cellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["cellStyle"]>;
        headerRowClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowClassName"]>;
        headerRowStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerRowStyle"]>;
        headerCellClassName: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellClassName"]>;
        headerCellStyle: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["headerCellStyle"]>;
        highlightCurrentRow: BooleanConstructor;
        currentRowKey: (NumberConstructor | StringConstructor)[];
        emptyText: StringConstructor;
        expandRowKeys: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["expandRowKeys"]>;
        defaultExpandAll: BooleanConstructor;
        defaultSort: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["defaultSort"]>;
        tooltipEffect: StringConstructor;
        tooltipOptions: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipOptions"]>;
        spanMethod: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["spanMethod"]>;
        selectOnIndeterminate: {
            type: BooleanConstructor;
            default: boolean;
        };
        indent: {
            type: NumberConstructor;
            default: number;
        };
        treeProps: {
            type: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["treeProps"]>;
            default: () => {
                hasChildren: string;
                children: string;
                checkStrictly: boolean;
            };
        };
        lazy: BooleanConstructor;
        load: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["load"]>;
        style: {
            type: import('vue').PropType<import('vue').CSSProperties>;
            default: () => {};
        };
        className: {
            type: StringConstructor;
            default: string;
        };
        tableLayout: {
            type: import('vue').PropType<"fixed" | "auto">;
            default: string;
        };
        scrollbarAlwaysOn: BooleanConstructor;
        flexible: BooleanConstructor;
        showOverflowTooltip: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["showOverflowTooltip"]>;
        tooltipFormatter: import('vue').PropType<import('element-plus').TableProps<import('element-plus/es/components/table/src/table/defaults.mjs').DefaultRow>["tooltipFormatter"]>;
        appendFilterPanelTo: StringConstructor;
        scrollbarTabindex: {
            type: (NumberConstructor | StringConstructor)[];
            default: undefined;
        };
        allowDragLastColumn: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onScroll?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
    }, {
        ns: {
            namespace: import('vue').ComputedRef<string>;
            b: (blockSuffix?: string) => string;
            e: (element?: string) => string;
            m: (modifier?: string) => string;
            be: (blockSuffix?: string, element?: string) => string;
            em: (element?: string, modifier?: string) => string;
            bm: (blockSuffix?: string, modifier?: string) => string;
            bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
            is: {
                (name: string, state: boolean | undefined): string;
                (name: string): string;
            };
            cssVar: (object: Record<string, string>) => Record<string, string>;
            cssVarName: (name: string) => string;
            cssVarBlock: (object: Record<string, string>) => Record<string, string>;
            cssVarBlockName: (name: string) => string;
        };
        layout: import('element-plus/es/components/table/src/table-layout.mjs').default<any>;
        store: any;
        columns: import('vue').ComputedRef<import('element-plus').TableColumnCtx<unknown>>;
        handleHeaderFooterMousewheel: (event: any, data: any) => void;
        handleMouseLeave: () => void;
        tableId: string;
        tableSize: import('vue').ComputedRef<"" | "small" | "default" | "large">;
        isHidden: import('vue').Ref<boolean>;
        isEmpty: import('vue').ComputedRef<boolean>;
        renderExpanded: import('vue').Ref<null>;
        resizeProxyVisible: import('vue').Ref<boolean>;
        resizeState: import('vue').Ref<{
            width: null | number;
            height: null | number;
            headerHeight: null | number;
        }>;
        isGroup: import('vue').Ref<boolean>;
        bodyWidth: import('vue').ComputedRef<string>;
        tableBodyStyles: import('vue').ComputedRef<{
            width: string;
        }>;
        emptyBlockStyle: import('vue').ComputedRef<{
            width: string;
            height: string;
        } | null>;
        debouncedUpdateLayout: import('lodash-es').DebouncedFunc<() => void>;
        handleFixedMousewheel: (event: any, data: any) => void;
        setCurrentRow: (row: any) => void;
        getSelectionRows: () => any;
        toggleRowSelection: (row: any, selected?: boolean, ignoreSelectable?: boolean) => void;
        clearSelection: () => void;
        clearFilter: (columnKeys?: string[]) => void;
        toggleAllSelection: () => void;
        toggleRowExpansion: (row: any, expanded?: boolean) => void;
        clearSort: () => void;
        doLayout: () => void;
        sort: (prop: string, order: string) => void;
        updateKeyChildren: (key: string, data: any[]) => void;
        t: import('element-plus').Translator;
        setDragVisible: (visible: boolean) => void;
        context: import('element-plus').Table<any>;
        computedSumText: import('vue').ComputedRef<string>;
        computedEmptyText: import('vue').ComputedRef<string>;
        tableLayout: import('vue').ComputedRef<("fixed" | "auto") | undefined>;
        scrollbarViewStyle: {
            display: string;
            verticalAlign: string;
        };
        scrollbarStyle: import('vue').ComputedRef<{
            height: string;
            maxHeight?: undefined;
        } | {
            maxHeight: string;
            height?: undefined;
        } | {
            height?: undefined;
            maxHeight?: undefined;
        }>;
        scrollBarRef: import('vue').Ref<any>;
        scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
        setScrollLeft: (left?: number) => void;
        setScrollTop: (top?: number) => void;
        allowDragLastColumn: boolean;
    }, {}, {}, {}, {
        data: any[];
        style: import('vue').CSSProperties;
        tableLayout: "fixed" | "auto";
        border: boolean;
        className: string;
        fit: boolean;
        lazy: boolean;
        scrollbarAlwaysOn: boolean;
        allowDragLastColumn: boolean;
        stripe: boolean;
        treeProps: import('element-plus/es/components/table/src/table/defaults.mjs').TreeProps | undefined;
        showHeader: boolean;
        showSummary: boolean;
        highlightCurrentRow: boolean;
        defaultExpandAll: boolean;
        selectOnIndeterminate: boolean;
        indent: number;
        flexible: boolean;
        scrollbarTabindex: string | number;
    }>>;
    config: {
        columns: {
            [x: string]: any;
            type: ClTable.ColumnType;
            hidden: boolean | {
                value: boolean;
            };
            component: {
                [x: string]: any;
                name?: string;
                options?: {
                    [x: string]: any;
                    label?: string;
                    value?: any;
                    color?: string;
                    type?: string;
                }[] | {
                    value: {
                        [x: string]: any;
                        label?: string;
                        value?: any;
                        color?: string;
                        type?: string;
                    }[];
                };
                props?: {
                    [x: string]: any;
                    onChange?: (value: any) => void;
                } | {
                    value: {
                        [x: string]: any;
                        onChange?: (value: any) => void;
                    };
                };
                style?: obj;
                slots?: {
                    [key: string]: (data?: any) => any;
                };
                vm?: any;
            };
            search: {
                isInput: boolean;
                value: any;
                icon: () => any;
                refreshOnChange: boolean;
                component: {
                    [x: string]: any;
                    name?: string;
                    options?: {
                        [x: string]: any;
                        label?: string;
                        value?: any;
                        color?: string;
                        type?: string;
                    }[] | {
                        value: {
                            [x: string]: any;
                            label?: string;
                            value?: any;
                            color?: string;
                            type?: string;
                        }[];
                    };
                    props?: {
                        [x: string]: any;
                        onChange?: (value: any) => void;
                    } | {
                        value: {
                            [x: string]: any;
                            onChange?: (value: any) => void;
                        };
                    };
                    style?: obj;
                    slots?: {
                        [key: string]: (data?: any) => any;
                    };
                    vm?: any;
                };
            };
            dict: {
                [x: string]: any;
                label?: string;
                value?: any;
                color?: string;
                type?: string;
            }[] | {
                value: {
                    [x: string]: any;
                    label?: string;
                    value?: any;
                    color?: string;
                    type?: string;
                }[];
            };
            dictFormatter: (values: DictOptions) => string;
            dictColor: boolean;
            dictSeparator: string;
            dictAllLevels: boolean;
            buttons: ((options: {
                scope: any;
            }) => ClTable.OpButton) | ("info" | "delete" | "edit" | AnyString | `slot-${string}` | {
                [x: string]: any;
                label: string;
                type?: string;
                hidden?: boolean;
                onClick: (options: {
                    scope: obj;
                }) => void;
            })[];
            align: ElementPlus.Align;
            label: any;
            renderLabel: (options: {
                column: any;
                $index: number;
            }) => any;
            className: string;
            prop: string & {};
            orderNum: number;
            width: string | number | {
                value: string | number;
            };
            minWidth: string | number | {
                value: string | number;
            };
            renderHeader: (options: {
                column: any;
                $index: number;
            }) => any;
            sortable: boolean | "desc" | "descending" | "ascending" | "asc" | "custom";
            sortMethod: fn;
            sortBy: string | any[] | ((row: any, index: number) => any);
            resizable: boolean;
            columnKey: string;
            headerAlign: ElementPlus.Align;
            showOverflowTooltip: boolean;
            fixed: boolean | string;
            render: (row: any, column: any, value: any, index: number) => any;
            formatter: (row: any, column: any, value: any, index: number) => any;
            selectable: (row: any, index: number) => boolean;
            reserveSelection: boolean;
            filterMethod: fn;
            filteredValue: unknown[];
            filters: unknown[];
            filterPlacement: string;
            filterMultiple: boolean;
            index: ((index: number) => number) | number;
            sortOrders: unknown[];
            children: /*elided*/ any[];
        }[];
        autoHeight: boolean;
        height: any;
        contextMenu: ("info" | "update" | "delete" | "edit" | "refresh" | {
            [x: string]: any;
            label: string;
            prefixIcon?: any;
            suffixIcon?: any;
            ellipsis?: boolean;
            disabled?: boolean;
            hidden?: boolean;
            children?: /*elided*/ any[];
            showChildren?: boolean;
            callback?: (done: fn) => void;
        } | ((row: obj, column: obj, event: PointerEvent) => ClContextMenu.Item) | "check" | "order-desc" | "order-asc")[];
        defaultSort: {
            prop: string;
            order: "descending" | "ascending";
        };
        sortRefresh: boolean;
        emptyText: string;
        rowKey: string;
        on?: {
            [key: string]: (...args: any[]) => void;
        };
        props?: {
            [key: string]: any;
        };
        plugins?: ClTable.Plugin[];
        onRowContextmenu?: (row: any, column: any, event: any) => void;
    };
};
export * from './data';
export * from './height';
export * from './op';
export * from './render';
export * from './row';
export * from './selection';
export * from './sort';
export * from './header';
