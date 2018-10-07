import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios";

let calculateButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("calculateButtonSimple");
calculateButton.addEventListener("click", calculate);

let aElement: HTMLInputElement = <HTMLInputElement>document.getElementById("number1");
let bElement: HTMLInputElement = <HTMLInputElement>document.getElementById("number2");
let resultElement: HTMLSpanElement = <HTMLSpanElement>document.getElementById("result");

function calculate(): void {
    axios.post<number>("https://miclrestcalculatorcore.azurewebsites.net/api/calculator/add",
        { A: aElement.value, B: bElement.value })
        .then((response: AxiosResponse<number>) => {
            console.log(response.data);
            resultElement.innerHTML = response.data;
        })
        .catch((error: AxiosError) => { console.log(error); });
}

// advanced calculator
let buttonElementA: HTMLButtonElement = <HTMLButtonElement>document.getElementById("calculateButtonAdvanced");
buttonElementA.addEventListener("click", calculateAdvanced);

 let resultElementAdvanced: HTMLDivElement = <HTMLDivElement>document.getElementById("resultAdvanced");

function calculateAdvanced(): void {
    let number1inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("number1A");
    let number2inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("number2A");

    let number1string: string = number1inputElement.value;
    let number2string: string = number2inputElement.value;

    // https://stackoverflow.com/questions/14667713/typescript-converting-a-string-to-a-number
    let number1: number = parseInt(number1string, 10);
    let number2: number = parseInt(number2string, 10);

    let operationElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById("operation");
    let operation: string = operationElement.value;
    console.log(operation);
    doIt(operation, number1, number2);
}

function doIt(operationStr: string, a: number, b: number): void {
    let uri: string = "https://miclrestcalculatorcore.azurewebsites.net/api/calculator/" + operationStr;
    axios.post<number>(uri,
        { A: a, B: b })
        .then((response: AxiosResponse<number>) => {
            console.log(response.data);
            resultElementAdvanced.innerHTML = response.data;
        })
        .catch((error: AxiosError) => { console.log(error); });
}