import useCustomTranslation from "@/hooks/useCustomTranslation"
import { OcrItem } from "@/types/response.type"
import Utils from "@/utils/Utils"
import { Column } from "primereact/column"
import { ColumnGroup } from "primereact/columngroup"
import { DataTable } from "primereact/datatable"
import { Row } from "primereact/row"
import { memo, useMemo } from "react"

type ResultOcrTableProps = {
    data?: OcrItem[]
}

type ResultOcrTableKey = keyof OcrItem;

const COLUMNS: ResultOcrTableKey[] = ['no', 'item', 'quantity', 'unit_price', 'total'];

const ResultOcrTable = ({
    data
}: ResultOcrTableProps): JSX.Element => {
    const {T} = useCustomTranslation();

    const renderBody = (rowItem: OcrItem, column: ResultOcrTableKey) => {
        const value = rowItem[column];
        switch(column) {
            case 'quantity': {
                return (
                    <div className="w-full text-right">
                        {value}
                    </div>
                )
            }
            case 'unit_price':
            case 'total': {
                return (
                    <div className="w-full text-right">
                        {Utils.formatPrice(Number(value))}
                    </div>
                )
            }
            default: {
                return (
                    <div>{rowItem[column]}</div>
                )
            }
        }
    }

    const totalPrice = useMemo(() => {
        if(!data) return 0;
        const total = data.reduce<number>((p,c) => p + Number(c.total), 0);
        return Utils.formatPrice(total);
    }, [data])

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column 
                    footer={`${T("totals")}:`}
                    colSpan={4}
                    footerClassName="!text-right" />
                <Column 
                    footer={totalPrice}
                    footerClassName="!text-right" />
            </Row>
        </ColumnGroup>
    );

    return (
        <div className="absolute inset-0 w-full h-full overflow-auto">
            <DataTable 
                value={data ?? []} 
                showGridlines
                stripedRows
                scrollable
                footerColumnGroup={footerGroup}>
                {
                    COLUMNS.map(column => 
                        <Column 
                            key={column}
                            field={column}
                            header={
                                <span className="capitalize">{T(`column-${column}`)}</span>
                            }
                            body={(rowItem) => renderBody(rowItem, column)}>

                        </Column>
                    )
                }
            </DataTable>
        </div>
    )
}

export default memo(ResultOcrTable);