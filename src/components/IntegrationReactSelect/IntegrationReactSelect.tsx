import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, Typography, TextField, Paper, Chip, MenuItem } from '@material-ui/core';
import styles from './integrationReactSelectStyle';
import * as Portal from 'react-overlays/lib/Portal';

type ChildInputType = {
  label: string,
  value: string
};

interface PropsType extends WithStyles<typeof styles, true> {
  isMulti: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  onChange?: any;
  options?: Array<ChildInputType>;
  customComponents?: any;
  isCreatable?: boolean;
  label: string;
  required: boolean;
}

class IntegrationReactSelect extends React.Component<PropsType> {
  _select: Element;
  state: { selectDOM: HTMLElement | null } = {
    selectDOM: null
  };

  formatCreateLabel = (inputValue: string) => `Add "${inputValue}"`;

  componentDidMount() {
    this.setState({
      selectDOM: (ReactDOM.findDOMNode(this._select) as any).children[0]
    });
  }

  _getRef = (c: any) => {
    this._select = c;
  }

  NoOptionsMessage = (props: any) => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
      >
        No data
      </Typography>
    );
  }

  inputComponent = ({ inputRef, ...props }: { inputRef: any, props: any }) => {
    return <div ref={inputRef} {...props} />;
  }

  Control = (props: any) => {
    const {
      label,
      required,
    } = this.props;

    return (
      <TextField
        fullWidth
        label={required ? `${label} *` : label}
        InputLabelProps={{ shrink: props.isFocused || props.hasValue }} // user typing or got value, label should shrink
        InputProps={{
          inputComponent: this.inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }

  Option = (props: any) => {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }

  Placeholder = () => {
    return '';
  }

  SingleValue = (props: any) => {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }

  ValueContainer = (props: any) => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }

  MultiValue = (props: any) => {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={event => {
          props.removeProps.onClick();
          props.removeProps.onMouseDown(event);
        }}
      />
    );
  }

  Menu = (props: any) => {
    const selectDOM = this.state.selectDOM;
    if (!selectDOM) {
      return null;
    }

    const rect = selectDOM.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(selectDOM); // inherit as many styles as you want from the parent select
    const fontSize = computedStyle.getPropertyValue('font-size');
    const lineHeight = computedStyle.getPropertyValue('line-height');
    const position = {
      top: rect.bottom - 3,
      left: rect.left,
      width: rect.width,
    };

    return (
      <Portal container={document.body}>
        <Paper
          square
          className={props.selectProps.classes.paper}
          style={{...position, fontSize, lineHeight}}
          {...props.innerProps}
        >
          {props.children}
        </Paper>
      </Portal>
    );
  }

  render() {
    const {
      theme,
      isSearchable = false,
      customComponents = {},
      isCreatable = false,
      ...props
    } = this.props;

    const selectStyles = {
      input: (base: any) => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    };

    const components = {
      Option: this.Option,
      Control: this.Control,
      NoOptionsMessage: this.NoOptionsMessage,
      Placeholder: this.Placeholder,
      SingleValue: this.SingleValue,
      MultiValue: this.MultiValue,
      ValueContainer: this.ValueContainer,
      Menu: this.Menu,
    };

    if (isCreatable) {
      return (
        <CreatableSelect
          ref={this._getRef}
          formatCreateLabel={this.formatCreateLabel}
          styles={selectStyles}
          components={{...components, ...customComponents}}
          isSearchable={isSearchable}
          {...props}
        />
      );
    }

    return (
      <Select
        ref={this._getRef}
        styles={selectStyles}
        components={{...components, ...customComponents}}
        isSearchable={isSearchable}
        {...props}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
