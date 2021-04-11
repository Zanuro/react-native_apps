import { Dimension, PixelRatio } from 'react-native';

export const itemMargin = 4;
export const containerPadding = 6;

export function calculateContainerSize(){
    return Dimension.get('window').width - 20;
}

export function calculateItemSize(columns){
    return PixelRatio.roundToNearestPixel(
        (calculateContainerSize() - containerPadding*2 - itemMargin*(columns-1)) / columns,
    );
}

export function calculateItemPosition(columns, ix){

    const itemSz = calculateItemSize(columns);

    return {
        top: containerPadding + Math.floor(ix / columns) * (itemSz + itemMargin),
        left: containerPadding + Math.floor(ix % columns) * (itemSz + itemMargin),
    }
}