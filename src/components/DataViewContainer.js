import React from "react";
import {Row, Col, Radio, Switch} from "antd";
import _ from "lodash";
import {ShotChart} from "./ShortChart"
import {CSlider} from "./CSlider"

const RadioGroup = Radio.Group;
export class DataViewContainer extends React.Component{

    state = {
        minCount: 2,
        chartType: "hexbin",
        displayTooltips: true,
    }

    onCountSliderChange = (minCount) => {
        this.setState({ minCount: Number(minCount) || 2 });
    }

    onChartTypeChange = (e) => {
        this.setState({chartType: e.target.value});
    }

    onTooltipChange = (displayTooltips) => {
        this.setState={displayTooltips};
    }
    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayToolTip={this.state.displayToolTips}
                />
                <div className="filters">
                    {this.state.chartType === 'hexbin'?
                        <CSlider
                            minCount={this.state.minCount}
                            onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                        /> : null
                    }
                    <Row className="chart-type-radio">
                        <Col span={12} offset={3}>
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={6}>
                            Tooltip:{' '}
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                defaultChecked
                                onChange={this.onTooltipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}