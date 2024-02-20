import * as React from "react";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import {
  GridColumnMenuSort,
  GridColumnMenuFilter,
  GridColumnMenuGroup,
} from "@progress/kendo-react-grid";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import { Rating } from "@progress/kendo-react-inputs";

interface BadgeCellProps {
  dataItem: {
    is_online: boolean;
  };
  tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
}

// interface BudgetCellProps {
//   dataItem?: {
//     target: number;
//   };
//   tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
// }

interface PersonCellProps {
  dataItem?: {
    image?: string;
    full_name: string;
  };
  tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
}

interface ProgressCellProps {
  dataItem: {
    target: number;
  };
  tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
  rowType: string;
}

interface RatingCellProps {
  field: string;
  dataItem: {
    [key: string]: any;
  };
  tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
  rowType: string;
}

interface CountryCellProps {
  dataItem?: {
    flag?: string;
  };
  tdProps: React.HTMLAttributes<HTMLTableDataCellElement>;
}

export const BadgeCell: React.FC<BadgeCellProps> = ({ dataItem, tdProps }) => {
  const isOnline = dataItem.is_online;

  return (
    <td {...tdProps}>
      <BadgeContainer>
        {isOnline ? (
          <Badge size="small" themeColor="success" cutoutBorder={true}>
            <span>Online</span>
          </Badge>
        ) : (
          <Badge
            size="small"
            align={{
              vertical: "bottom",
              horizontal: "end",
            }}
            themeColor="error"
            cutoutBorder={true}
          >
            <span>Offline</span>
          </Badge>
        )}
      </BadgeContainer>
    </td>
  );
};

// export const BudgetCell: React.FC<BudgetCellProps> = ({
//   dataItem,
//   tdProps,
// }) => {
//   if (dataItem && dataItem.target !== undefined) {
//     const budget = dataItem.target;
//     const formattedBudget = `$${budget.toFixed(3)}`;
//     return <td {...tdProps}>{formattedBudget}</td>;
//   }
// };

export const ColumnMenu = (props: any) => {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
      <GridColumnMenuGroup {...props} />
    </div>
  );
};

export const PersonCell: React.FC<PersonCellProps> = ({
  dataItem,
  tdProps,
}) => {
  console.log(dataItem, "hello");
  if (!dataItem || !dataItem.image) {
    return <td {...tdProps}>{dataItem?.full_name}</td>;
  }

  const imageDataUrl = dataItem.image.replace(/url\('(.*)'\)/, "$1");
  return (
    <td {...tdProps}>
      <img src={imageDataUrl} width="34" height="34" className="contact-img" />
      <span
        style={{
          display: "inline-block",
          paddingLeft: "10px",
          verticalAlign: "middle",
          lineHeight: "32px",
        }}
        className="person-name"
      >
        {dataItem.full_name}
      </span>
    </td>
  );
};

export const ProgressCell: React.FC<ProgressCellProps> = (props) => {
  const progress = props.dataItem.target;
  if (props.rowType === "groupHeader") {
    return null;
  }
  return (
    <td {...props.tdProps}>
      <ProgressBar
        style={{
          width: "150px",
          height: "10px",
          marginRight: "20px",
        }}
        value={progress}
        labelVisible={false}
      />
      {progress} %<span> </span>
    </td>
  );
};
export const RatingCell: React.FC<RatingCellProps> = (props) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  if (props.rowType === "groupHeader") {
    return null;
  }
  return (
    <td {...props.tdProps}>
      <Rating
        value={value === null ? "" : props.dataItem[field]}
        readonly={true}
      />{" "}
    </td>
  );
};

export const CountryCell: React.FC<CountryCellProps> = ({
  dataItem,
  tdProps,
}) => {
  if (!dataItem || !dataItem.flag) {
    return null;
  }

  return (
    <td {...tdProps}>
      <img
        src={dataItem.flag}
        width="30"
        height="16"
        alt="Flag"
        style={{
          marginLeft: "12px",
        }}
      />
    </td>
  );
};
