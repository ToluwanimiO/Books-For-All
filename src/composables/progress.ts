export default function useProgress() {
    const checkProgress = (range: any, index: number, ranges: any) => {
        let nextKey = Object.keys(ranges)[index + 1];
        let next = ranges[nextKey];
        if (range && next && !next.status) return "process";
        if (range) return "finish";
        if (!range) return "wait";
    }

    const percent = (fraction: number, total: number) => {
        const intFraction = Number(fraction);
        const intTotal = Number(total);

        if (intFraction > intTotal) {
            return 100;
        }
        if (intTotal !== 0) {
            return (intFraction / intTotal) * 100;
        }
        return 0;
    }

    const setPercentColor = (fraction: number, total: number) => {
        if (total !== 0) {
            const percentage = (fraction / total) * 100;
            if (percentage < 50) {
                return "#F40529";
            } else if (percentage < 80) {
                return "#FF9D00";
            } else {
                return "#03A84E";
            }
        }
        return "F40529";
    }

    return {
        checkProgress,
        percent,
        setPercentColor
    }
};
