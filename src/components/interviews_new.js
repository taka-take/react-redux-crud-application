import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button, Paper } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const formats = [
  { value: 1, label: '記述式'},
  { value: 2, label: '段落'},
  { value: 3, label: 'ラジオボタン'},
  { value: 4, label: 'チェックボックス'},
  { value: 5, label: 'プルダウン'},
  { value: 6, label: '選択式（グリッド）'},
  { value: 7, label: 'チェックボックス（グリッド）'},
  { value: 8, label: '日付'},
  { value: 9, label: '時刻'},
]

class InterviewsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    const isError = error ? true : false
    return (
      <TextField
        label={label}
        type={type}
        error={touched && isError}
        helperText={touched && error}
        {...input}
        fullWidth
      />
    )
  }
  renderSelect(field) {
    const { input, label, type, meta: { touched, error } } = field
    // const { classes } = this.props
    return (
      <TextField
        id="standard-select-currency"
        select
        label={label}
        {...input}
        fullWidth
        // value={this.state.currency}
        // onChange={this.handleChange('currency')}
        SelectProps={{
          MenuProps: {
            // className: classes.menu,
          },
        }}
        helperText="回答形式を選択して下さい"
        margin="normal"
      >
        {formats.map(format => (
          <MenuItem key={format.value} value={format.value}>
            {format.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  async onSubmit(values) {
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="問診票のタイトル" name="title" type="text" component={this.renderField} /></div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Field label="質問" name="questionText" type="text" component={this.renderField} />
            <Field label="回答形式" name="answerFormats" type="select" component={this.renderSelect} />
          </Paper>
        </main>
        <Button variant="contained" type="submit" style={style} disabled={pristine || submitting || invalid} >submit</Button>
        <Button variant="contained" style={style} component={Link} to="/" >cancel</Button>

      </form>
    )
  }
}
const validate = values => {
  const errors = {}
  if (!values.title) errors.title = "Enter a title please."
  if (!values.body) errors.body = "Enter a body please."
  return errors
}
//   const mapDispatchToProps = ({ postEvent })
export default connect(null, null)(
  reduxForm({ validate, form: 'interviewsNew' })(withStyles(styles)(InterviewsNew))
)