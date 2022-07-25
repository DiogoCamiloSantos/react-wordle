import { Component, KeyboardEvent, ReactNode } from "react";
import { IHiddenLetterProps } from "../../models/HiddenLetter/HiddenLetterProps.interface";
import { InstructionByPressedKey } from "../../models/PressedKeyValidator/PressedKeyStatement.enum";
import { PressedKeyValidator } from "../../models/PressedKeyValidator/PressedKeyValidator";
import './HiddenLetter.css';

export class HiddenLetter extends Component<IHiddenLetterProps> {
    constructor(props: IHiddenLetterProps) {
        super(props);
    }

    private validatePressedKey(e: KeyboardEvent<HTMLInputElement>) {
        const pressed = new PressedKeyValidator(e, this.props.letterInfo);
        const actions = pressed.getActions();

        if (this.props.letterInfo.isResolved() || actions[0] === InstructionByPressedKey.StopEvent)
            return;

        if (actions.includes(InstructionByPressedKey.AcceptLetter)) {
            this.setState({});
            this.props.letterInfo.setCharacter(e.key);
        }

        this.props.setFocused(this.props.letterInfo,  pressed.getActions());
    }

    private createInputRef(ref: any) {
        this.props.setReference(ref);
    }

    render(): ReactNode {
        return (
            <div className={"letter-field " + ((this.props.letterInfo.getResolvedColor() || 'not') + '-answered')}>
                <input 
                    disabled={!this.props.letterInfo.active || !!this.props.letterInfo.isResolved()}
                    className="letter-input"
                    onChange={(e) => { }}
                    onKeyDown={(e) => this.validatePressedKey(e)}
                    ref={(ref) => this.createInputRef(ref)}
                    value={this.props.letterInfo.getCharacter()} />
            </div>
        )
    }
}

