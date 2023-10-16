import { EventedProps, createLayerComponent } from "@react-leaflet/core";
import {
    LatLngExpression,
    Marker as LeafletMarker,
    MarkerOptions
} from "leaflet";
import "leaflet-rotatedmarker";
import { ReactNode } from "react";

export interface MarkerProps extends MarkerOptions, EventedProps {
    children?: ReactNode;
    position: LatLngExpression;
}

export const RotatedMarker = createLayerComponent < LeafletMarker, MarkerProps> (
    function createMarker({ position, ...options }, ctx) {
        const instance = new LeafletMarker(position, options);
        instance.setRotationAngle(options.rotationAngle);
        instance.setRotationOrigin(options.rotationOrigin);
        return { instance, context: { ...ctx, overlayContainer: instance } };
    },
    function updateMarker(marker, props, prevProps) {
        if (props.rotationAngle !== prevProps.rotationAngle) {
            marker.setRotationAngle(props.rotationAngle);
        }
        if (props.rotationOrigin !== prevProps.rotationOrigin) {
            marker.setRotationOrigin(props.rotationOrigin);
        }
        if (props.position !== prevProps.position) {
            marker.setLatLng(props.position);
        }
        if (props.icon != null && props.icon !== prevProps.icon) {
            marker.setIcon(props.icon);
        }
        if (
            props.zIndexOffset != null &&
            props.zIndexOffset !== prevProps.zIndexOffset
        ) {
            marker.setZIndexOffset(props.zIndexOffset);
        }
        if (props.opacity != null && props.opacity !== prevProps.opacity) {
            marker.setOpacity(props.opacity);
        }
        if (marker.dragging != null && props.draggable !== prevProps.draggable) {
            if (props.draggable === true) {
                marker.dragging.enable();
            } else {
                marker.dragging.disable();
            }
        }
    }
);
