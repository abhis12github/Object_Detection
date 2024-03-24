import cv2
import os
import numpy as np

def detectImage(filepath):
    image = cv2.imread(filepath)
    print(image)
    h = image.shape[0]
    w = image.shape[1]

    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # absolute path
    model_dir = os.path.join(current_dir, "ssd_mobilenet")
    weights = os.path.join(model_dir, "frozen_inference_graph.pb")
    model = os.path.join(model_dir, "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt")
    coconames=os.path.join(model_dir, "coco_names.txt")
    print(weights,model,coconames)
    
    # model
    net = cv2.dnn.readNetFromTensorflow(weights, model)

    class_names = []
    with open(coconames, "r") as f:
        class_names = f.read().strip().split("\n")

    blob = cv2.dnn.blobFromImage(image, 1.0/127.5, (320, 320), [127.5, 127.5, 127.5])
    
    net.setInput(blob)
    output = net.forward() 
    
    objects_detected=[]


    for detection in output[0, 0, :, :]:  
        probability = detection[2]

        if probability < 0.56:
            continue

        box = [int(a * b) for a, b in zip(detection[3:7], [w, h, w, h])]
        box = tuple(box)
        
        cv2.rectangle(image, box[:2], box[2:], (0, 255, 0), thickness=2)

        x1, y1, x2, y2 = box

        class_id = int(detection[1])
        
        objects_detected.append(class_names[class_id - 1])

        label = f"{class_names[class_id - 1].upper()} {probability * 100:.2f}%"
        cv2.putText(image, label, (box[0], box[1] + 15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return image,objects_detected

