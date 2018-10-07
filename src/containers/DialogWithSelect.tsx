import * as React from 'react';
import { Button, Paper, Typography, WithStyles, createStyles, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SimpleDialog from '../components/SimpleDialog/SimpleDialog';
import IntegrationReactSelect from '../components/IntegrationReactSelect/IntegrationReactSelect';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = (theme: Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 50
  },
});

type State = {
  open: boolean;
};

type Props = WithStyles<typeof styles>;

class DialogWithSelect extends React.Component<Props> {
  state: State = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ open: false });
  }

  public render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" component="h3">
          Dialog form with react-select
        </Typography>
        <Typography component="p">
          <p>Example shows how to use react-select in MUI style.</p>
          <p>In the offical MUI
            demo <a href="https://material-ui.com/demos/autocomplete/#react-select" target="_blank">autocomplete</a> with React-select</p>
          <p>The demo code the select dropdown cannot float above the dialog, which
          cause the dropdown partially shown problem.</p>
          <p>My example shows the solution.</p>
          <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        </Typography>
        <SimpleDialog
          title="Dialog form with react-select"
          open={open}
          onClose={this.handleClose}
        >
          <IntegrationReactSelect
            isMulti={false}
            isClearable={true}
            isSearchable={true}
            options={suggestions}
            label={'Select a country'}
            required
          />
          <IntegrationReactSelect
            isMulti={true}
            isClearable={true}
            isSearchable={true}
            options={suggestions}
            label={'Select mutiple countries'}
            required
          />
        </SimpleDialog>
      </Paper>
    );
  }
}

export default withStyles(styles)(DialogWithSelect);
