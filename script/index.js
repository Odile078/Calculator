//calculator class
class Calculator{
    constructor(previousOperationText,currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.clear()
    }
    //clear method
    clear(){
        this.currentOperation=''
        this.previousOperation=''
        this.operator= undefined
        
    }
    //delete method
    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0, -1)
    }
    //addNmuber method
    addNumber(number){
        if(number ==='.'&& this.currentOperation.includes('.'))return
        this.currentOperation =this.currentOperation.toString()+ number.toString()
    }
    // choose operator method
    chooseOperator(operator){
        if(this.currentOperation==='')return
        if(this.previousOperation !==''){
            this.calculate()
        }
        this.operator = operator
        this.previousOperation= this.currentOperation
        this.currentOperation =''
        
    }
    //calculate method
    calculate(){
        let calculation
        const prev = parseFloat(this.previousOperation)
        const current =parseFloat(this.currentOperation)
        if(isNaN(prev)|| isNaN(current))return
        switch(this.operator){
            case '+':
                calculation=prev+current
                break
            case '-':
                calculation=prev-current
                break
            case '*':
                calculation=prev*current
                break
            case '/':
                calculation=prev/current
                break
            default:
                return
        }
        this.currentOperation=calculation
        this.operator =undefined
        this.previousOperation=''
    }
    //update display method
    updateDisplay(){
        this.currentOperationText.innerText=this.currentOperation
        if(this.operator != null){
        this.previousOperationText.innerText=`${this.previousOperation} ${this.operator}`
        }
    }
}
//defining the button variable
const buttonNumber = document.querySelectorAll('[data-number]')
const buttonOperator= document.querySelectorAll('[data-operation]')
const buttonequal = document.querySelector('[data-equals]')
const buttondelete = document.querySelector('[data-delete]')
const buttonclear = document.querySelector('[data-all-clear]')
const previousOperationText = document.querySelector('[data-previous-operation]')
const currentOperationText = document.querySelector('[data-current-operation]')

//calling the calculator class
const calculator = new Calculator(previousOperationText,currentOperationText)

//Event listener of the number button
buttonNumber.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    })
})
//Event listener of the operator button
buttonOperator.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

//Event listener of the equal button
buttonequal.addEventListener('click',button=>{
    calculator.calculate()
    calculator.updateDisplay()
})

//Event listener of the clear button
buttonclear.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
//Event listener of the delete button
buttondelete.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})