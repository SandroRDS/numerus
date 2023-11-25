interface ITipsGenerator {
    generate: (drawnNumber: number, numberTips: number) => String[];
}

export default ITipsGenerator;