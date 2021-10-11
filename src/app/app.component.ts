import { Component } from '@angular/core';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { CalculatedFieldService, CellEditSettings, ConditionalFormattingService, DisplayOption, DrillThroughService, FieldListService, GroupingBarService, GroupingService, IDataOptions, PivotChartService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
      GroupingBarService,
      GroupingService,
      FieldListService,
      CalculatedFieldService,
      DrillThroughService,
      ToolbarService,
      PivotChartService,
      ConditionalFormattingService
  ]
})
export class AppComponent {

  displayOption: Partial<DisplayOption>;
  toolbarOptions: ToolbarItems[];
  dataSourceSettings: IDataOptions;
  chartSettings: Partial<ChartSettings>;
  editSettings: Partial<CellEditSettings>;
  gridSettings: Partial<GridSettings>;

  drillThroughDatas: string;

  dataSource: {
    objectId: number,
    resourceLabel: string,
    date: Date,
    quantity: number | null,
    unitPrice: number,
    productAmount: number,
    chargeAmount: number
  } [];

	constructor() {
    this.setDataSourceSettings();
    this.initializePivotSettings();
	}

  setDataSourceSettings() {
    this.dataSourceSettings = {
      dataSource: this.getDataSource(),
      showHeaderWhenEmpty: false,
      expandAll: false,
      emptyCellsTextContent: '',
      allowMemberFilter: true,
      showAggregationOnValueField: false,
      drilledMembers: [
				{ name: 'operationDate_date_group_years', items: ['2021'] }
			],
      columns: [
        {
          name: 'date',
          caption: 'date',
          showRemoveIcon: false,
          showEditIcon: false,
          allowDragAndDrop: false
        }
      ],
      values: [
        {
          name: 'quantity',
          caption: 'Quantity',
          type: "Sum"
        },
        {
          name: 'directMargin',
          caption: 'Margin',
          type: "CalculatedField"
        },
        {
          name: 'directMarginPercent',
          caption: 'Margin %',
          type: "CalculatedField"
        }
      ],
      rows: [
        {
          name: 'resourceLabel',
          caption: 'Resource'
        }
      ],
      filters: [

      ],
      groupSettings: [
          { name: 'date', groupInterval: ['Years', 'Months'], type: 'Date' },
      ],
      filterSettings: [],
      calculatedFieldSettings: [
        {
          name: 'directMargin',
          formula: '"Sum(productAmount)" - ("Sum(chargeAmount)")'
        },
        {
          name: 'directMarginPercent',
          formula: '("Sum(productAmount)" - ("Sum(chargeAmount)")) / "Sum(productAmount)"'
        }
      ],
      formatSettings: [
        {
          name: 'directMarginPercent',
          format: '##.## %',
        }
      ]
    };
  }

  private getDataSource() {
    this.dataSource = [
      {
        objectId: 1,
        resourceLabel: "Bernard",
        date: new Date(2021, 5, 1),
        quantity: 12,
        unitPrice: 350,
        productAmount: 4200,
        chargeAmount: 3500
      },
      {
        objectId: 2,
        resourceLabel: "Bernard",
        date: new Date(2021, 6, 1),
        quantity: 8,
        unitPrice: 350,
        productAmount: 2800,
        chargeAmount: 2450
      },
      {
        objectId: 3,
        resourceLabel: "Julie",
        date: new Date(2021, 5, 1),
        quantity: 20,
        unitPrice: 420,
        productAmount: 8400,
        chargeAmount: 4850
      },
      {
        objectId: 4,
        resourceLabel: "Julie",
        date: new Date(2021, 6, 1),
        quantity: 17,
        unitPrice: 420,
        productAmount: 7140,
        chargeAmount: 4650
      },
      {
        objectId: 5,
        resourceLabel: "Marc",
        date: new Date(2021, 5, 1),
        quantity: 15,
        unitPrice: 250,
        productAmount: 3750,
        chargeAmount: 3210
      },
      {
        objectId: 6,
        resourceLabel: "Marc",
        date: new Date(2021, 6, 1),
        quantity: 18,
        unitPrice: 250,
        productAmount: 47500,
        chargeAmount: 3650
      },
      {
        objectId: 7,
        resourceLabel: "Britney",
        date: new Date(2021, 5, 1),
        quantity: 22,
        unitPrice: 680,
        productAmount: 14960,
        chargeAmount: 12350
      },
      {
        objectId: 8,
        resourceLabel: "Britney",
        date: new Date(2021, 6, 1),
        quantity: null,
        unitPrice: 680,
        productAmount: 14280,
        chargeAmount: 12550
      },
    ]
    return this.dataSource;
  }


	initializePivotSettings() {
		if (!this.displayOption) {
			this.displayOption = { view: 'Both', primary: 'Table' };
		}
		if (!this.toolbarOptions) {
			this.toolbarOptions = [
		'SaveAs', 'Save', 'Rename',
		'Remove', 'Load', 'Export', 'Grid', 'Chart' , 'SubTotal',
		'GrandTotal', 'ConditionalFormatting',
		/*'NumberFormatting',*/ 'FieldList', ] as ToolbarItems[];
		}
		if (!this.editSettings) {
			this.editSettings = {
				allowAdding: false,
				allowDeleting: false,
				allowEditing: false,
				mode: 'Batch'
			}
		}
		if (!this.gridSettings) {
			this.gridSettings = {
				allowReordering: false,
				allowSelection: false,
				rowHeight: 40,
				selectionSettings: {
					mode: 'Cell',
					cellSelectionMode: 'Flow',
					type: 'Multiple'
				}
			};
		}

		if (!this.chartSettings) {
			this.chartSettings = { chartSeries: { type: 'Column' }} as ChartSettings;
		}
			this.dataSourceSettings.valueAxis = "row";
	}

  onDrillThrough(event) {
      event.cancel = true;
      this.drillThroughDatas = event.rawData;
  }

  onCellSelected(event) {

  }

}
