import * as React from "react";
import * as strings from "ReactDatatableWebPartStrings";
import { CSVLink } from "react-csv";
import { IIconProps, PrimaryButton } from "office-ui-fabric-react";
import styles from "./ExportListItemsToCSV.module.scss";

// Define a specific type for the data
interface IDataRow {
  [key: string]: string | number | boolean; // Adjust types based on your data
}

interface IExportToCSV {
  columnHeader: Array<string>;
  listName: string;
  description: string;
  dataSource: () => Array<IDataRow>; // Updated type
}

export function ExportListItemsToCSV(props: IExportToCSV) {
  const downloadIcon: IIconProps = { iconName: "Download" };

  // Use const for destructuring
  const { listName, dataSource } = props;

  return (
    <CSVLink data={dataSource()} filename={`${listName}.csv`}>
      <PrimaryButton
        text={strings.DownloadAsCSVLabel}
        iconProps={downloadIcon}
        className={styles.btnCSV}
      />
    </CSVLink>
  );
}
