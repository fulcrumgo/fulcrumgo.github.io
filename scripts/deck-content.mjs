/**
 * Course deck content, original material written for Fulcrum.
 *
 * These are Fulcrum's own notes: the explanations, framing, ordering and
 * diagrams here were written for this programme. Where a specific paper,
 * model or result is referenced, it is cited by name so a reader can go and
 * find the primary source. Nothing here is rebranded from another
 * institution's course material.
 */

const AUTHOR = "Utsav Poudel";
const ORG = "Founder, Fulcrum";
const LICENSE =
  "Original material © Fulcrum. Released free for study and teaching under CC BY 4.0, reuse and adapt it, but keep the attribution. Named papers and models are cited so you can go to the primary source.";

/* A small hand-drawn convolution diagram, authored here rather than lifted. */
const CONV_SVG = `<svg viewBox="0 0 320 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#0a0a0a" stroke-width="1">
    ${[0, 1, 2, 3, 4]
      .map((r) =>
        [0, 1, 2, 3, 4]
          .map(
            (c) =>
              `<rect x="${8 + c * 18}" y="${28 + r * 18}" width="18" height="18" fill="${
                r < 3 && c < 3 ? "#f0ded9" : "none"
              }"/>`
          )
          .join("")
      )
      .join("")}
  </g>
  <text x="8" y="20" font-size="10" fill="#8d8a83" font-family="Inter">input</text>
  <text x="150" y="20" font-size="10" fill="#8d8a83" font-family="Inter">kernel</text>
  <g stroke="#b4472f" stroke-width="1.2">
    ${[0, 1, 2]
      .map((r) =>
        [0, 1, 2]
          .map(
            (c) =>
              `<rect x="${150 + c * 18}" y="${28 + r * 18}" width="18" height="18" fill="#f0ded9"/>`
          )
          .join("")
      )
      .join("")}
  </g>
  <path d="M212 55 L240 55" stroke="#8d8a83" stroke-width="1.2" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 z" fill="#8d8a83"/></marker></defs>
  <text x="252" y="20" font-size="10" fill="#8d8a83" font-family="Inter">feature map</text>
  <g stroke="#0a0a0a" stroke-width="1">
    ${[0, 1, 2]
      .map((r) =>
        [0, 1, 2]
          .map(
            (c) =>
              `<rect x="${252 + c * 18}" y="${28 + r * 18}" width="18" height="18" fill="none"/>`
          )
          .join("")
      )
      .join("")}
  </g>
  <text x="8" y="134" font-size="10.5" fill="#55534e" font-family="Inter">One kernel slides over every position,</text>
  <text x="8" y="148" font-size="10.5" fill="#55534e" font-family="Inter">using the same weights everywhere.</text>
</svg>`;

const ATTENTION_SVG = `<svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="8" y="16" font-size="10" fill="#8d8a83" font-family="Inter">every token looks at every other token</text>
  ${["The", "cat", "sat", "on", "it"]
    .map(
      (t, i) =>
        `<rect x="${8 + i * 62}" y="30" width="52" height="24" fill="#f6f5f2" stroke="#e3e0da"/>
         <text x="${34 + i * 62}" y="46" font-size="11" fill="#0a0a0a" font-family="Inter" text-anchor="middle">${t}</text>`
    )
    .join("")}
  ${[0, 1, 2, 3]
    .map(
      (i) =>
        `<path d="M${34 + 4 * 62} 56 Q ${34 + i * 62} 100 ${34 + i * 62} 56"
          stroke="#b4472f" stroke-width="${i === 1 ? 2 : 0.8}"
          opacity="${i === 1 ? 1 : 0.35}" fill="none"/>`
    )
    .join("")}
  <text x="8" y="130" font-size="10.5" fill="#55534e" font-family="Inter">Resolving "it" means weighting "cat" heavily</text>
  <text x="8" y="146" font-size="10.5" fill="#55534e" font-family="Inter">and the rest lightly. Those weights are learned.</text>
</svg>`;

/* Front-matter slide, identical in every deck. */
const ABOUT_SLIDE = {
  type: "about",
  heading: "Who made this, and why it is free",
  paras: [
    "**Fulcrum** is a volunteer-run non-profit. We help people from under-resourced regions learn artificial intelligence through one-on-one mentorship, research and publication supervision, project support, workshops, and a guest speaker series.",
    "The premise is simple. Ability is spread evenly across the world; opportunity is not. What separates a capable student in Pokhara or rural Bihar from one at a well-funded lab is rarely intelligence. It is access to supervision, to reviewers, to equipment, and to the unwritten rules nobody writes down.",
    "This deck is part of how we try to close that. It is free, it will stay free, and you may reuse and adapt it for your own teaching under CC BY 4.0. If it is useful to you, come and find us.",
  ],
};

const base = { author: AUTHOR, org: ORG, license: LICENSE };

/* ========================================================================== */

export const computerVisionFoundations = {
  ...base,
  slug: "computer-vision-foundations",
  title: "Computer Vision: Foundations",
  shortTitle: "CV Foundations",
  subtitle:
    "How a machine gets from a grid of numbers to something worth calling perception. Written for people meeting the field for the first time.",
  kicker: "Fulcrum course notes · 01",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "An image is a grid of numbers. That is the whole starting point.",
      note: "Every technique in this deck is a way of answering one question: which arrangements of those numbers mean something?",
    },
    {
      type: "content",
      heading: "What a computer actually receives",
      lede: "There is no picture. There is an array.",
      bullets: [
        "A greyscale image is a 2-D array of intensities, usually `0 to 255` per pixel.",
        "A colour image is three stacked arrays (red, green, blue) so shape is `height × width × 3`.",
        "**Resolution** is how many samples you took of the world; **bit depth** is how finely you recorded each one.",
        "Everything downstream is arithmetic on this array. Nothing more mysterious than that.",
      ],
      note: "Worth sitting with: a face and a picture of static are the same kind of object to the machine. Only the pattern differs.",
      aside: {
        title: "Try this first",
        body: "Load an image with NumPy, print `.shape`, then set the green channel to zero and look at the result. Ten minutes of that teaches more than an hour of slides.",
      },
    },
    {
      type: "content",
      heading: "Colour spaces, and why RGB is often the wrong one",
      bullets: [
        "**RGB** matches how screens emit light, not how people describe colour.",
        "**HSV** splits hue from saturation and brightness, far easier for 'find the red things' under changing light.",
        "**Greyscale** discards colour entirely. Often the right call: it cuts data by two-thirds and many tasks do not need it.",
        "**LAB** separates lightness from colour in a way closer to human perception, which matters for measuring colour difference.",
      ],
      note: "Rule of thumb: if lighting varies and you care about the object's own colour, leave RGB.",
    },
    {
      type: "content",
      heading: "Filtering: the one operation to understand properly",
      lede: "A kernel is a small grid of weights slid across the image, multiplying and summing as it goes.",
      bullets: [
        "**Blur** (averaging or Gaussian) suppresses noise and fine detail.",
        "**Sharpen** amplifies the difference between a pixel and its neighbours.",
        "**Edge kernels** (Sobel, Prewitt) respond where intensity changes quickly.",
        "Change only the numbers in the kernel and you change what the filter detects. The machinery stays identical.",
      ],
      note: "This is the exact operation a convolutional network performs. The difference is that a CNN learns the kernel weights instead of you choosing them.",
      aside: { title: "Convolution", svg: CONV_SVG },
    },
    {
      type: "content",
      heading: "Edges, and what they are really telling you",
      bullets: [
        "An edge is a **steep gradient** in intensity, the image's rate of change, not its value.",
        "**Sobel** estimates that gradient in x and y; magnitude gives edge strength, direction gives orientation.",
        "**Canny** adds the parts that make it usable: noise smoothing, thinning edges to one pixel, and hysteresis thresholding so weak edges survive only when connected to strong ones.",
        "Edges are cheap, fast, and surprisingly robust to lighting, which is why they held the field for decades.",
      ],
      note: "They also fail honestly: a shadow boundary and an object boundary look identical to a gradient operator. That failure is what pushed the field toward learned features.",
    },
    {
      type: "content",
      heading: "Thresholding and segmentation",
      lede: "Splitting an image into regions that belong together.",
      bullets: [
        "**Global thresholding** picks one cut-off for the whole image. Fine for a scan, hopeless under uneven light.",
        "**Otsu's method** chooses that cut-off automatically by maximising separation between the two resulting groups.",
        "**Adaptive thresholding** computes a local cut-off per neighbourhood, the fix for uneven illumination.",
        "**Morphological operations** (erode, dilate, open, close) clean up the ragged result afterwards.",
      ],
    },
    {
      type: "content",
      heading: "Classical features: SIFT and friends",
      lede: "Before learned features, the task was to hand-design descriptors that survive change.",
      bullets: [
        "A good feature is **repeatable** (found again in another view) and **distinctive** (not confusable with everything else).",
        "**SIFT** (Lowe, 2004) finds keypoints across scales and describes each by local gradient orientations, robust to scale, rotation and moderate lighting change.",
        "**ORB** is a fast, free alternative built from FAST keypoints and BRIEF descriptors.",
        "Matching descriptors between two images is what powers panorama stitching, visual odometry, and object instance recognition.",
      ],
      note: "These are not obsolete. For geometry problems (stitching, structure-from-motion, calibration), classical features are still often the right tool.",
    },
    {
      type: "section",
      part: "two",
      heading: "Where hand-designed features run out",
      note: "You can design a descriptor for corners. You cannot realistically design one for 'cat'.",
    },
    {
      type: "content",
      heading: "The learned-feature turn",
      bullets: [
        "Hand-designed features encode what **we** think matters. That works for geometry and breaks for semantics.",
        "A convolutional network learns its kernels from data, so the features are whatever reduces the loss.",
        "**AlexNet** (2012) cut ImageNet error dramatically and made the argument impossible to ignore.",
        "Three things had to arrive together: large labelled datasets, GPUs, and a few training tricks that stopped deep networks diverging.",
      ],
      aside: {
        title: "The honest version",
        body: "The ideas were largely in place by the late 1990s. What changed was data and compute. Remember that when you read that some result is a conceptual breakthrough.",
      },
    },
    {
      type: "content",
      heading: "How a CNN sees, layer by layer",
      bullets: [
        "**Early layers** respond to edges and colour blobs, strikingly similar to the filters we used to design by hand.",
        "**Middle layers** combine those into textures, corners, and repeated motifs.",
        "**Late layers** respond to object parts and whole objects.",
        "**Pooling** and strided convolution shrink the spatial grid, so each later neuron sees a larger region of the original image, its *receptive field*.",
      ],
      note: "Nobody specified this hierarchy. It falls out of training, and it looks broadly the same across architectures and datasets.",
    },
    {
      type: "content",
      heading: "The three tasks you will meet first",
      bullets: [
        "**Classification**, one label for the whole image. 'This is a chest X-ray showing cardiomegaly.'",
        "**Detection**, labels plus boxes. 'There are three people, here, here and here.'",
        "**Segmentation**, a label for every pixel. Semantic segmentation labels classes; instance segmentation separates individuals of the same class.",
        "Difficulty and annotation cost rise sharply across those three. Choose the loosest one that solves your problem.",
      ],
      note: "A lot of wasted effort comes from reaching for segmentation when classification would have answered the question.",
    },
    {
      type: "content",
      heading: "Evaluating honestly",
      lede: "The most common failure in student vision projects is not the model. It is the evaluation.",
      bullets: [
        "**Accuracy lies on imbalanced data.** If 97% of scans are normal, predicting 'normal' always scores 97%.",
        "Use **precision** and **recall**, and be explicit about which error is worse in your setting.",
        "For detection, **IoU** measures box overlap; **mAP** averages precision across recall levels and classes.",
        "Split your data **before** you look at it, and never tune against the test set.",
      ],
      note: "If your accuracy looks remarkable, assume leakage until you have proved otherwise. Near-duplicate images across splits is the usual culprit.",
    },
    {
      type: "content",
      heading: "Data: the part nobody puts in the paper",
      bullets: [
        "**Augmentation** (flips, crops, colour jitter, rotation), buys generalisation cheaply. Make sure the transform preserves the label.",
        "**Normalisation** to a consistent mean and scale makes optimisation far better behaved.",
        "**Class imbalance** can be handled by resampling or by weighting the loss; both are better than ignoring it.",
        "**Label noise** is normal, not exceptional. Inspect a random hundred examples by hand before you trust any dataset.",
      ],
      note: "Time spent looking at your data returns more than time spent trying architectures. This is consistently true and consistently ignored.",
    },
    {
      type: "content",
      heading: "Getting started without a GPU",
      bullets: [
        "**Transfer learning**, take a pretrained backbone, replace the final layer, fine-tune. Works with hundreds of images rather than millions.",
        "Free hosted notebooks (Colab, Kaggle) give usable GPU time at no cost.",
        "Start with small images. `128×128` trains fast and tells you whether your pipeline is correct.",
        "Get an intentionally overfitted model working on ten examples first. If it cannot memorise ten, the bug is in your code, not your model.",
      ],
      aside: {
        title: "Where compute stops being the blocker",
        body: "For most learning projects it never was. Understanding of the problem, and clean data, run out long before GPU hours do.",
      },
    },
    {
      type: "end",
      heading: "Next: Computer Vision, Advanced",
      note: "Detection and segmentation architectures, vision transformers, generative models, and video. Bring a project you actually want to build.",
    },
  ],
};

/* ========================================================================== */

export const computerVisionAdvanced = {
  ...base,
  slug: "computer-vision-advanced",
  title: "Computer Vision: Advanced",
  shortTitle: "CV Advanced",
  subtitle:
    "Detection, segmentation, transformers, generative models and video: the architectures behind modern vision systems, and where each one breaks.",
  kicker: "Fulcrum course notes · 02",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "Beyond one label per image",
      note: "Assumes the Foundations deck: convolution, receptive fields, and honest evaluation.",
    },
    {
      type: "content",
      heading: "Object detection: two families",
      bullets: [
        "**Two-stage** (R-CNN → Fast → Faster R-CNN): propose regions, then classify and refine each. More accurate, slower.",
        "**Single-stage** (YOLO, SSD, RetinaNet): predict boxes and classes in one pass over a grid. Faster, historically less precise on small objects.",
        "**Anchors** are prior boxes at fixed scales and aspect ratios; the network learns offsets from them.",
        "**Non-maximum suppression** removes duplicate boxes for the same object, a post-processing step, not a learned one.",
      ],
      note: "RetinaNet's contribution was focal loss: down-weighting the flood of easy background examples that otherwise dominates a single-stage detector's gradient.",
    },
    {
      type: "content",
      heading: "Segmentation architectures",
      bullets: [
        "**Fully convolutional networks** replace the classifier head with convolutions, so the output stays a spatial map.",
        "**U-Net** adds skip connections between encoder and decoder, restoring the fine spatial detail that downsampling destroyed. Designed for biomedical images; still a strong default.",
        "**Mask R-CNN** bolts a mask branch onto Faster R-CNN to get instance segmentation.",
        "**Dilated convolution** enlarges the receptive field without losing resolution, useful when you cannot afford to downsample.",
      ],
      aside: {
        title: "Why U-Net keeps winning",
        body: "Medical datasets are small and detail matters at the boundary. Skip connections address exactly that. Matching an architecture to a data regime beats reaching for the newest model.",
      },
    },
    {
      type: "content",
      heading: "Residual connections, and why depth became possible",
      bullets: [
        "Stacking layers naively makes networks *harder* to train. Deeper models were performing worse than shallower ones.",
        "**ResNet** (2015) has each block learn a residual `F(x)`, with output `F(x) + x`.",
        "That identity path gives gradients a clean route backwards, so hundreds of layers become trainable.",
        "The idea generalised well beyond vision. Residual connections are inside essentially every transformer too.",
      ],
    },
    {
      type: "section",
      part: "two",
      heading: "Attention arrives in vision",
      note: "The convolutional prior is powerful. It is also an assumption, and assumptions can be paid for with data.",
    },
    {
      type: "content",
      heading: "Vision Transformers",
      bullets: [
        "**ViT** cuts an image into fixed patches, embeds each as a token, and runs a standard transformer encoder.",
        "It discards convolution's built-in assumption that nearby pixels belong together, so it needs more data, or strong augmentation and regularisation, to match a CNN.",
        "Given enough data it scales better than CNNs, which is why it dominates at large scale.",
        "**Swin Transformer** reintroduces locality with shifted windows, recovering efficiency and hierarchy.",
      ],
      note: "Practical guidance: below roughly tens of thousands of images, a pretrained CNN is usually still the better starting point. Do not choose an architecture by publication date.",
    },
    {
      type: "content",
      heading: "Self-supervised learning",
      lede: "Labels are the expensive part. Self-supervision removes the need for most of them.",
      bullets: [
        "**Contrastive methods** (SimCLR, MoCo) pull two augmented views of one image together in embedding space and push different images apart.",
        "**Masked image modelling** (MAE) hides most patches and trains the model to reconstruct them.",
        "**DINO** trains without negatives and produces features whose attention maps segment objects with no segmentation labels at all.",
        "Pretrain on unlabelled data, then fine-tune on the small labelled set you can actually afford.",
      ],
      note: "For under-resourced research groups this is the most important development of the last decade. Unlabelled images are free; annotation is not.",
    },
    {
      type: "content",
      heading: "Generative models",
      bullets: [
        "**GANs** pit a generator against a discriminator. Sharp results, but unstable training and prone to mode collapse.",
        "**VAEs** learn a probabilistic latent space. Stable, principled, and typically blurrier.",
        "**Diffusion models** learn to reverse a gradual noising process. They now dominate image generation on quality and controllability.",
        "Diffusion trades compute for quality: sampling takes many steps, though distillation techniques are closing that gap.",
      ],
      aside: {
        title: "The intuition for diffusion",
        body: "Destroying an image with noise is easy and needs no learning. So train a network to undo one small step of it, then run that reversal repeatedly from pure noise.",
      },
    },
    {
      type: "content",
      heading: "Vision-language models",
      bullets: [
        "**CLIP** trains image and text encoders jointly so matching pairs land near each other in a shared space.",
        "That yields **zero-shot classification**: score an image against text prompts you invent at inference time, with no retraining.",
        "**Captioning and VQA** models attach a language model to a vision encoder to describe images and answer questions about them.",
        "These systems inherit their training data's biases wholesale, and the data is web-scraped, so audit before deploying anywhere consequential.",
      ],
    },
    {
      type: "content",
      heading: "Video: time is not just another dimension",
      bullets: [
        "**Optical flow** estimates per-pixel motion between frames, the classical foundation.",
        "**3-D convolutions** extend kernels across time; expensive but effective for short clips.",
        "**Two-stream** designs process appearance and motion separately, then fuse.",
        "**Tracking** couples per-frame detection with association across frames; the hard part is occlusion and identity switches, not detection.",
      ],
      note: "Video multiplies your data volume, annotation cost and compute all at once. Be sure the problem genuinely needs temporal information before taking that on.",
    },
    {
      type: "content",
      heading: "Deployment realities",
      bullets: [
        "**Quantisation** to 8-bit typically gives large speedups for small accuracy loss.",
        "**Pruning** and **distillation** shrink models, distillation often preserves accuracy better.",
        "**Edge deployment** (ONNX Runtime, TensorRT, TFLite) matters when connectivity is unreliable, which is exactly the setting many of our mentees work in.",
        "Measure latency on the **target device**, not your laptop. The numbers differ by an order of magnitude.",
      ],
    },
    {
      type: "content",
      heading: "Failure modes worth expecting",
      bullets: [
        "**Distribution shift**, a model trained on one hospital's scanner degrades on another's. This is the rule, not the exception.",
        "**Shortcut learning**, the model finds a ruler in the image that correlates with the diagnosis, and uses that instead.",
        "**Adversarial fragility**, imperceptible perturbations flip predictions.",
        "**Dataset bias**, accuracy that is excellent on average and poor for the group you most needed it to serve.",
      ],
      note: "Report per-group performance, not just aggregate. If you cannot, say so in the limitations section. Reviewers respect that far more than a suspiciously round number.",
    },
    {
      type: "content",
      heading: "Choosing a research question that will survive review",
      bullets: [
        "Novelty in architecture is the hardest and most crowded route. Novelty in **application, dataset, or careful evaluation** is often more publishable.",
        "A well-documented dataset from an under-represented setting is a real contribution.",
        "Reproducing a published result and reporting where it fails is a real contribution too, and more useful than most incremental papers.",
        "Ask early: what would change my mind about this hypothesis? If nothing would, it is not yet a research question.",
      ],
    },
    {
      type: "end",
      heading: "Bring us the project",
      note: "Fulcrum mentors work through exactly this: scoping, evaluating honestly, and getting to submission. Free, and open to anyone from an under-resourced region.",
    },
  ],
};

/* ========================================================================== */

export const machineLearning = {
  ...base,
  slug: "machine-learning-foundations",
  title: "Machine Learning: Foundations",
  shortTitle: "ML Foundations",
  subtitle:
    "What it means for a machine to learn from data, the handful of ideas that recur everywhere, and how to tell a real result from a flattering one.",
  kicker: "Fulcrum course notes · 03",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "Learning means fitting a function you did not write",
      note: "Every model in this deck is a family of functions plus a rule for picking one.",
    },
    {
      type: "content",
      heading: "The three ingredients",
      bullets: [
        "A **model family**, the shape of function you will allow (a line, a tree, a network).",
        "A **loss function**, a number saying how wrong a given function is on your data.",
        "An **optimiser**, a procedure for reducing that number by adjusting parameters.",
        "Change any one and you get a different algorithm. That is genuinely most of the field.",
      ],
      aside: {
        title: "Worth internalising",
        body: "When you meet an unfamiliar method, ask those three questions. Papers that seem impenetrable usually become simple once you identify the family, the loss and the optimiser.",
      },
    },
    {
      type: "content",
      heading: "Supervised, unsupervised, reinforcement",
      bullets: [
        "**Supervised**. You have inputs and correct outputs. Classification and regression live here, and so does most deployed ML.",
        "**Unsupervised**, inputs only. Clustering, dimensionality reduction, density estimation.",
        "**Reinforcement**, an agent acts, receives reward, and learns a policy. Powerful, sample-hungry, and harder to get working than the literature suggests.",
        "**Self-supervised** sits between the first two: labels invented from the data's own structure.",
      ],
    },
    {
      type: "content",
      heading: "Linear and logistic regression",
      lede: "Start here, and keep coming back here.",
      bullets: [
        "**Linear regression** fits `y = w·x + b` by minimising squared error. It has a closed-form solution.",
        "**Logistic regression** passes that same linear score through a sigmoid to get a probability, and minimises cross-entropy.",
        "Both are **interpretable**: each weight says how the prediction moves as one feature moves.",
        "They are the correct baseline. A complex model that cannot beat logistic regression is telling you something.",
      ],
      note: "In applied work, a linear model with good features very often beats a neural network with bad ones.",
    },
    {
      type: "content",
      heading: "Gradient descent",
      bullets: [
        "Compute the gradient of the loss with respect to each parameter, the direction of steepest increase.",
        "Step in the opposite direction. Repeat.",
        "The **learning rate** sets step size: too large and you diverge, too small and you never arrive.",
        "**Stochastic** gradient descent estimates the gradient from a mini-batch, which is noisier per step but far faster overall, and the noise itself helps escape poor minima.",
      ],
      note: "Adam adapts a per-parameter step size and is a reasonable default. It is not magic; a badly scaled problem still trains badly.",
    },
    {
      type: "content",
      heading: "Overfitting, and the bias and variance trade-off",
      bullets: [
        "**Underfitting (high bias)**, the model is too simple to capture the pattern. Poor on train and test alike.",
        "**Overfitting (high variance)**, the model memorised the training set, including its noise. Excellent on train, poor on test.",
        "The gap between training and validation performance is your main diagnostic. Watch it every run.",
        "More data reduces variance. It does not fix bias.",
      ],
      aside: {
        title: "The most common student error",
        body: "Tuning hyperparameters against the test set, then reporting test performance. That number is now meaningless. Keep a set you look at exactly once.",
      },
    },
    {
      type: "content",
      heading: "Regularisation",
      bullets: [
        "**L2 (ridge)** penalises large weights, spreading influence across features.",
        "**L1 (lasso)** drives some weights to exactly zero, performing feature selection as it fits.",
        "**Early stopping** halts training when validation loss turns upward.",
        "**Dropout** randomly disables units during training, preventing over-reliance on any single path.",
      ],
    },
    {
      type: "content",
      heading: "Trees and ensembles",
      bullets: [
        "A **decision tree** splits on features recursively. Highly interpretable, and prone to overfitting alone.",
        "**Random forests** average many trees trained on bootstrap samples with random feature subsets, cutting variance.",
        "**Gradient boosting** (XGBoost, LightGBM) fits each new tree to the previous ensemble's errors.",
        "On tabular data, boosted trees remain extremely hard to beat, including by deep learning.",
      ],
      note: "If your data is a spreadsheet, start with gradient boosting. Reaching straight for a neural network is a common and expensive mistake.",
    },
    {
      type: "content",
      heading: "Evaluation that will survive a reviewer",
      bullets: [
        "**Cross-validation** gives a variance estimate, not just a point score. Report the spread.",
        "**Precision, recall, F1** for imbalanced problems; state which error type actually matters in your setting.",
        "**ROC-AUC** summarises ranking quality across thresholds; **PR-AUC** is more informative under heavy imbalance.",
        "Always report a **baseline**, majority class, or a simple linear model. A number without a baseline means nothing.",
      ],
    },
    {
      type: "content",
      heading: "Features, leakage, and other quiet disasters",
      bullets: [
        "**Leakage** is any information in your features that would not exist at prediction time. It is the leading cause of results that collapse in deployment.",
        "Scale and impute using statistics computed on the **training fold only**, then apply to validation. Doing it beforehand leaks.",
        "Beware features that encode the answer, a patient ID that correlates with ward, and therefore diagnosis.",
        "For time series, split **chronologically**. Random splits let the model see the future.",
      ],
      note: "If a result seems too good, look for leakage before you look for a discovery. It is the explanation the overwhelming majority of the time.",
    },
    {
      type: "content",
      heading: "A workflow that holds up",
      bullets: [
        "Frame the question and decide **in advance** what result would be meaningful.",
        "Build the dumbest baseline that could work. Record it.",
        "Improve one thing at a time, and keep a log of what you tried and what happened.",
        "Test once, at the end. Report honestly, including what failed.",
      ],
      aside: {
        title: "Why the log matters",
        body: "Six months on, writing the paper, you will not remember which of forty runs used which settings. The log is the difference between a reproducible result and a story.",
      },
    },
    {
      type: "end",
      heading: "Next: Deep Learning, Foundations",
      note: "Neural networks, backpropagation, and what actually changes when you stack layers.",
    },
  ],
};

/* ========================================================================== */



/* ========================================================================== */





/* ========================================================================== */

export const aiForEveryone = {
  ...base,
  slug: "ai-for-everyone",
  title: "AI for Everyone",
  shortTitle: "AI for Everyone",
  subtitle:
    "No maths, no code, no jargon. What AI actually is, what it can and cannot do, and how to use it well. Written for students, teachers, and anyone who keeps hearing about it.",
  kicker: "Fulcrum course notes · 06",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "It is a pattern machine, not a mind",
      note: "Almost every confusion about AI comes from getting this one thing backwards.",
    },
    {
      type: "content",
      heading: "What AI actually is",
      lede: "Strip away the language and it is simpler than it sounds.",
      bullets: [
        "A program that finds **patterns in examples**, then applies them to something new.",
        "Show it thousands of photos labelled 'cat' and it learns what tends to be true of cat photos. Nobody writes the rules down.",
        "It does not understand cats. It has a very good statistical sense of what cat-shaped data looks like.",
        "That is the whole trick, repeated at enormous scale.",
      ],
      note: "This is why AI is brilliant at things with lots of examples, and unreliable at things it has rarely seen.",
      aside: {
        title: "A useful test",
        body: "Ask: could this be learned from examples? If yes, AI probably does it well. If it needs judgement about something genuinely new, be careful.",
      },
    },
    {
      type: "content",
      heading: "Why it arrived so suddenly",
      bullets: [
        "The ideas are decades old. What changed recently is **data** and **computing power**.",
        "The internet produced enormous quantities of text and images to learn from.",
        "Graphics chips, built for games, turned out to be ideal for training these models.",
        "Once both existed, methods that had always been theoretically sound started working in practice.",
      ],
      note: "So it feels like a sudden breakthrough. It is closer to a long slow build that finally crossed a threshold.",
    },
    {
      type: "content",
      heading: "What a chatbot is really doing",
      bullets: [
        "It predicts **the next word**, over and over, based on everything before it.",
        "It was trained on a vast amount of text, so its predictions are usually sensible and fluent.",
        "It is optimised for **plausibility**, not truth. Those two usually coincide, and sometimes do not.",
        "When it invents a fact, a citation, or a quote, that is the same machinery working normally, not a glitch.",
      ],
      note: "It is a superb writer with an unreliable memory. Treat it that way and you will rarely be caught out.",
    },
    {
      type: "content",
      heading: "What it is genuinely good at",
      bullets: [
        "**Explaining** something you find difficult, at whatever level you ask for.",
        "**Rewriting and summarising** text you already have.",
        "**Translating** between languages, and between technical and plain wording.",
        "**Getting you started**, a first draft, an outline, an idea to react to.",
        "**Answering embarrassing questions** patiently, at two in the morning, without judgement.",
      ],
      aside: {
        title: "The pattern",
        body: "It excels when you supply the material and it transforms it. It is weakest when you ask it to supply facts from memory.",
      },
    },
    {
      type: "content",
      heading: "Where it goes wrong",
      bullets: [
        "**Confident invention.** It will produce a fake reference in the same tone as a real one.",
        "**Out-of-date knowledge.** It knows what it was trained on, not what happened last week.",
        "**Inherited bias.** Trained on human text, it reproduces human prejudice.",
        "**No sense of its own limits.** It cannot reliably tell you when it does not know.",
      ],
      note: "Rule: if it matters, verify it somewhere else. Especially numbers, citations, medical and legal claims.",
    },
    {
      type: "section",
      part: "two",
      heading: "Using it to study, without it doing the studying",
      note: "The question students ask most: doesn't this make us worse at thinking?",
    },
    {
      type: "content",
      heading: "“Doesn’t using AI make us dumb?”",
      lede: "It can. It depends entirely on which of two things you do with it.",
      bullets: [
        "**Learning with it**, asking it to explain, to quiz you, to check your reasoning. This makes you better.",
        "**Outsourcing to it**, having it produce the answer you then hand in. This makes you worse, quietly.",
        "The danger is that outsourcing feels productive. Work gets finished, and nothing is learned.",
        "The honest test: **could you now do it without the AI?** If not, you did not learn it.",
      ],
      note: "Learn with AI. Do not let AI learn for you. That single sentence is most of the guidance you need.",
      aside: {
        title: "Try this instead",
        body: "Attempt the problem first. Then ask AI to critique your attempt. You keep the thinking and still get the help.",
      },
    },
    {
      type: "content",
      heading: "Asking well",
      bullets: [
        "**Give context.** 'Explain recursion to a 15-year-old who knows loops' beats 'explain recursion'.",
        "**Say what you want back**, a list, a paragraph, a worked example, a counter-argument.",
        "**Ask it to show its reasoning**, then check the reasoning rather than trusting the answer.",
        "**Push back.** 'What is wrong with that?' and 'What would a critic say?' produce far better results than accepting the first reply.",
      ],
    },
    {
      type: "content",
      heading: "Tools worth knowing",
      bullets: [
        "**Chat assistants**, explanation, drafting, and rewriting.",
        "**Wolfram Alpha**, maths and science, computed rather than predicted, so the answers are actually reliable.",
        "**Translation tools**, good enough for meaning, still imperfect for nuance.",
        "**Search with AI summaries**, quick orientation, but follow the links before you cite anything.",
      ],
      note: "For anything numerical, prefer a tool that calculates over one that predicts. This distinction matters more than any brand.",
    },
    {
      type: "content",
      heading: "Jobs, honestly",
      bullets: [
        "Tasks change faster than whole jobs disappear. Most roles absorb the tools and move on.",
        "The people affected first are those doing routine work that is easy to describe in text.",
        "The people who gain most are those who understand their own field **and** know how to use the tools.",
        "You do not need to become an engineer. You need to stop being intimidated by it.",
      ],
    },
    {
      type: "content",
      heading: "Where to go next",
      bullets: [
        "Use one assistant properly for a month on real work. Practical familiarity beats theory here.",
        "If you enjoy it, learn a little **Python**. It is the language nearly all of this is built in.",
        "Our **Machine Learning: Foundations** deck is the natural next step, and assumes no prior knowledge.",
        "Bring a question to our Discord. Genuinely, no question is too basic there.",
      ],
    },
    {
      type: "end",
      heading: "This was written for you to keep",
      note: "Share it, teach from it, print it for a classroom. If you want to go further, we mentor people through exactly that, free.",
    },
  ],
};

/* ========================================================================== */

export const aiForExperts = {
  ...base,
  slug: "ai-for-experts",
  title: "AI for Experts",
  shortTitle: "AI for Experts",
  subtitle:
    "For people who already build models: scaling behaviour, training at the frontier, evaluation that survives scrutiny, alignment, and the open problems worth your time.",
  kicker: "Fulcrum course notes · 07",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "Scale changed what the research question is",
      note: "Assumes comfort with backpropagation, transformers, and standard training practice.",
    },
    {
      type: "content",
      heading: "Scaling laws and compute allocation",
      bullets: [
        "Loss falls as a **smooth power law** in parameters, data and compute, predictable across orders of magnitude.",
        "**Kaplan et al. (2020)** established the relationships; **Chinchilla (Hoffmann et al., 2022)** corrected the balance, showing most large models were badly undertrained for their size.",
        "The practical consequence: for a fixed compute budget, a smaller model on more tokens usually beats a larger model on fewer.",
        "Inference cost scales with parameters, not training tokens, which pushes deployed models smaller still.",
      ],
      note: "Scaling laws are empirical regularities, not laws of nature. They hold well within the regimes measured and should not be extrapolated casually.",
      aside: {
        title: "Why this matters here",
        body: "Chinchilla-optimal thinking is what makes small, well-trained models competitive, and small models are what groups without clusters can actually train and serve.",
      },
    },
    {
      type: "content",
      heading: "Emergence, and how much of it is real",
      bullets: [
        "Some capabilities appear abruptly with scale rather than improving smoothly.",
        "**Schaeffer et al. (2023)** argue much apparent emergence is an artefact of discontinuous metrics. Exact-match scoring turns steady improvement into a sudden jump.",
        "Under continuous metrics, many 'emergent' curves become smooth.",
        "Some phenomena still resist that explanation. The question is open, and worth being precise about rather than rhetorical.",
      ],
    },
    {
      type: "content",
      heading: "Training at the frontier: what actually bites",
      bullets: [
        "**Data quality dominates.** Deduplication and filtering routinely beat architectural changes.",
        "**Instability**, loss spikes, divergence. Mitigations: gradient clipping, careful warmup, attention logit control, lower precision only where safe.",
        "**Parallelism**, data, tensor, pipeline and sequence parallelism each trade memory against communication differently.",
        "**Checkpointing and restartability** are not incidental. At scale, hardware failure during a run is expected.",
      ],
      note: "Most published gains, examined closely, come from data work rather than modelling. This is under-reported because it is unglamorous.",
    },
    {
      type: "content",
      heading: "Efficiency: attention and memory",
      bullets: [
        "**FlashAttention** reorders the computation to avoid materialising the attention matrix in HBM, an IO-aware exact method, not an approximation.",
        "**Grouped-query and multi-query attention** shrink the KV cache, which is the real constraint on long-context inference.",
        "**Mixture of experts** raises parameter count while keeping per-token compute roughly fixed; routing and load balancing are where it gets difficult.",
        "**State-space models** (Mamba and successors) offer sub-quadratic sequence handling with competitive quality on several tasks.",
      ],
    },
    {
      type: "section",
      part: "two",
      heading: "Evaluation is where most claims quietly fail",
      note: "If you take one thing from this deck, take this part.",
    },
    {
      type: "content",
      heading: "Benchmark contamination",
      bullets: [
        "Web-scale training corpora very likely contain the test sets you are evaluating on.",
        "**Check for contamination explicitly** (n-gram overlap against your eval sets, at minimum) and report what you find.",
        "Prefer **held-out or freshly constructed** evaluations for headline claims.",
        "Static benchmarks decay: once a benchmark matters, it leaks into training data and stops measuring generalisation.",
      ],
      note: "A result on a contaminated benchmark is not a small error. It measures memorisation and reports it as capability.",
    },
    {
      type: "content",
      heading: "Evaluating generative systems",
      bullets: [
        "Single-number leaderboard scores hide almost everything that matters.",
        "**LLM-as-judge** is scalable but biased, toward length, toward its own family's outputs, toward confident phrasing. Calibrate against human labels before trusting it.",
        "Report **variance across seeds and prompts**. Prompt sensitivity is frequently larger than the effect being claimed.",
        "Break results down by subgroup, language and domain. Aggregate scores conceal exactly the failures that matter in deployment.",
      ],
      aside: {
        title: "A reviewer's first question",
        body: "Is the baseline tuned as hard as the proposed method? A surprising number of reported gains vanish when it is.",
      },
    },
    {
      type: "content",
      heading: "Alignment and post-training",
      bullets: [
        "**RLHF**, reward model from preference comparisons, then policy optimisation, usually PPO. Effective and operationally heavy.",
        "**DPO** optimises the preference objective directly, skipping the explicit reward model. Simpler, often comparable.",
        "**Constitutional / AI feedback** methods substitute model-generated critiques for some human labelling.",
        "**Reward hacking** is the persistent failure: the policy optimises the proxy, not the intent. Expect it and measure for it.",
      ],
    },
    {
      type: "content",
      heading: "Interpretability, briefly",
      bullets: [
        "**Probing** tests what information is linearly recoverable from representations, informative, but presence is not use.",
        "**Circuit analysis** traces specific behaviours to specific components; convincing on narrow tasks, hard to scale.",
        "**Sparse autoencoders** decompose activations into more monosemantic features, addressing superposition.",
        "**Attention weights are not explanations.** Attribution requires intervention, not inspection.",
      ],
    },
    {
      type: "content",
      heading: "Doing frontier-adjacent work without frontier compute",
      lede: "The constraint is real. It is also less total than it appears.",
      bullets: [
        "**Small-model science**. Many phenomena reproduce at 100M parameters, where careful ablations are actually affordable.",
        "**Evaluation and dataset work** needs rigour rather than GPUs, and is chronically undersupplied.",
        "**Efficiency research** is directly motivated by scarcity, and scarcity is your starting condition.",
        "**Domain and language specialisation**. You have access to data and context that large labs do not.",
      ],
      note: "Competing on general capability is not a sensible strategy without a cluster. Choosing questions where compute is not the binding constraint is.",
      aside: {
        title: "Where the gaps are",
        body: "Well-resourced labs pursue what is measurable on English benchmarks at scale. Everything outside that is comparatively unexplored.",
      },
    },
    {
      type: "content",
      heading: "Open problems worth a serious project",
      bullets: [
        "**Multilingual equity**, tokenisation cost, quality, and evaluation for low-resource languages.",
        "**Reliable uncertainty**, calibrated confidence remains largely unsolved and matters enormously for deployment.",
        "**Long-context that genuinely works**. Context windows have grown faster than the ability to use them well.",
        "**Robust evaluation**, better methods for measuring capability without contamination or judge bias.",
        "**Domain deployment studies**, careful, honest failure analysis in medicine, agriculture, education.",
      ],
    },
    {
      type: "end",
      heading: "Supervision, if you want it",
      note: "We mentor researchers through exactly this: scoping a question, evaluating it honestly, and getting it through peer review. Free, and open to anyone from an under-resourced region.",
    },
  ],
};


/* ========================================================================== */

export const aiInMedicine = {
  ...base,
  slug: "ai-in-medicine",
  title: "Artificial Intelligence in Medicine",
  shortTitle: "AI in Medicine",
  subtitle:
    "Every specialty, what has actually been built, what works in a clinic rather than a paper, and where it fails. Written for clinicians, students, and researchers entering the field.",
  kicker: "Fulcrum course notes · 08",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "Medicine is the hardest place to deploy a model, and the most worth doing",
      note: "A recommender system that fails shows you a bad film. A clinical model that fails delays a diagnosis. Everything in this deck follows from that difference.",
    },
    {
      type: "content",
      heading: "Why clinical AI is not ordinary machine learning",
      bullets: [
        "**The cost of errors is asymmetric.** A missed cancer and a false alarm are not equally bad, and which is worse depends on the disease, the test that follows, and the patient.",
        "**The data was never collected for you.** Records exist for billing and for care, not for training. What is missing is rarely missing at random.",
        "**Distribution shift is the rule.** A model trained on one hospital's scanner, population and protocol degrades at the next hospital. This is expected behaviour, not a bug.",
        "**Deployment is regulated.** Anything that informs a clinical decision is a medical device in most jurisdictions, with the evidence burden that implies.",
      ],
      note: "A model that reads beautifully in a paper and never touches a patient is the normal outcome. Plan for the gap between the two from the first day.",
      aside: {
        title: "The one question",
        body: "Ask early: what clinical decision changes because of this output? If nobody would act differently, the accuracy number does not matter.",
      },
    },
    {
      type: "content",
      heading: "What clinical data actually looks like",
      lede: "Six broad kinds, each with its own failure modes.",
      bullets: [
        "**Imaging.** Radiographs, CT, MRI, ultrasound, retinal photographs, whole slide pathology. Large, standardised as DICOM, and the most mature area by far.",
        "**Waveforms.** ECG, EEG, photoplethysmography, ventilator traces. High frequency, cheap to collect, badly under-used.",
        "**Structured records.** Labs, vitals, medications, diagnostic codes. Cheap to obtain and full of traps, because codes reflect billing as much as biology.",
        "**Free text.** Discharge summaries, referral letters, radiology reports. The richest clinical signal and the hardest to handle safely.",
        "**Omics.** Genomic, transcriptomic, proteomic. Very wide, very few samples, so overfitting is the default state.",
        "**Sensor and wearable streams.** Continuous glucose, accelerometry, home monitors. Growing quickly, and the data quality is variable.",
      ],
    },
    {
      type: "section",
      part: "two",
      heading: "Specialty by specialty",
      note: "What exists, with named examples you can go and read. Where a system is in clinical use rather than a research result, it says so.",
    },
    {
      type: "content",
      heading: "Radiology",
      lede: "The most commercially advanced area of clinical AI, and the one with the clearest workflow fit.",
      bullets: [
        "**Triage and worklist reordering.** Flagging intracranial haemorrhage or large vessel occlusion so the urgent scan is read first. This is where most deployed value sits.",
        "**Detection assistance.** Lung nodules on CT, fractures on radiographs, breast lesions on mammography.",
        "**Quantification.** Volumes, densities and measurements that a human would do slowly and inconsistently.",
        "**Reporting support.** Draft findings that a radiologist edits and signs.",
        "**CheXNet** (Rajpurkar et al., 2017) trained on ChestX-ray14 was an early demonstration that a convolutional network could match radiologist performance on specific findings.",
      ],
      note: "Reality check: the great majority of AI medical devices authorised by regulators to date are radiology products, and most of them assist rather than replace a reader.",
      aside: {
        title: "Why radiology first",
        body: "Images are already digital, already standardised, already stored centrally, and already have a written report attached as a label. Almost no other specialty starts from there.",
      },
    },
    {
      type: "content",
      heading: "Ophthalmology",
      bullets: [
        "**Diabetic retinopathy screening** is the single clearest success story in clinical AI. Gulshan et al. (JAMA, 2016) showed deep learning grading retinal photographs at specialist level.",
        "**IDx-DR** received FDA authorisation in 2018 as the first autonomous diagnostic AI, meaning it returns a result without a clinician interpreting the image.",
        "**Why it worked:** a common disease, a cheap standardised image, a shortage of graders, and a clear action when positive (refer to an ophthalmologist).",
        "**Also active:** glaucoma from optic disc images, age related macular degeneration progression, retinopathy of prematurity.",
      ],
      note: "The lesson generalises. Screening tasks with abundant images, scarce specialists and a simple downstream action are where AI helps most, and those conditions hold across much of South Asia and sub-Saharan Africa.",
    },
    {
      type: "content",
      heading: "Pathology",
      bullets: [
        "**Whole slide imaging** turned glass slides into gigapixel files, which made computational pathology possible at all.",
        "**CAMELYON16 and CAMELYON17** benchmarked detection of breast cancer metastasis in lymph nodes, and top systems matched or exceeded pathologists working under time pressure.",
        "**Mitosis counting, Gleason grading and tumour proportion scoring** are tasks where human agreement is genuinely poor, so consistency is worth a lot.",
        "**Prognosis from morphology.** Models can predict outcomes and molecular subtypes from stained tissue alone, which is a claim worth scrutinising carefully.",
      ],
      note: "Slides are enormous, often 100,000 pixels across, so almost every method works on tiles and then aggregates. How you aggregate matters more than the backbone.",
    },
    {
      type: "content",
      heading: "Dermatology",
      bullets: [
        "**Esteva et al. (Nature, 2017)** classified skin lesions at dermatologist level using a network pretrained on ordinary photographs, which made the field take transfer learning seriously.",
        "**Teledermatology triage** is the realistic deployment: sorting which lesions need urgent review when a specialist is weeks away.",
        "**The known failure:** training sets are dominated by lighter skin. Performance on darker skin is frequently worse and frequently unreported.",
        "**Image quality varies wildly.** Phone cameras, lighting and focus differ far more than in radiology, where acquisition is controlled.",
      ],
      note: "If you build in this area, report performance by Fitzpatrick skin type. If your dataset cannot support that, say so in the limitations rather than reporting a single number.",
      aside: {
        title: "A real gap",
        body: "Dermatology datasets from South Asian and African populations barely exist. Building one carefully is a genuine contribution, and needs a camera rather than a cluster.",
      },
    },
    {
      type: "content",
      heading: "Cardiology",
      bullets: [
        "**ECG interpretation** is the oldest form of clinical AI. Rule based ECG software has shipped since the 1970s; deep learning has since raised accuracy substantially.",
        "**Attia et al. (Nature Medicine, 2019)** trained a network to detect low ejection fraction from a standard 12 lead ECG, finding something a cardiologist cannot see by eye.",
        "**Atrial fibrillation detection** on consumer wearables moved screening out of the clinic entirely, with all the false positive problems that implies in a low prevalence population.",
        "**Echocardiography** automation covers view classification, chamber segmentation and ejection fraction estimation.",
      ],
      note: "The ejection fraction result is worth dwelling on. The model is not replicating a human reading; it is extracting a signal humans did not know was in the trace. That is where machine learning earns its place.",
    },
    {
      type: "content",
      heading: "Oncology",
      bullets: [
        "**Radiotherapy planning.** Automatic contouring of tumours and organs at risk cuts hours of manual work per patient, and is widely deployed.",
        "**Treatment response prediction** from serial imaging, and radiomics features extracted from scans.",
        "**Pathology and genomics integration** for subtyping and prognosis.",
        "**Trial matching.** Reading a patient record against eligibility criteria, which is tedious, error prone and well suited to language models.",
      ],
      note: "Radiomics has a reproducibility problem worth knowing about. Feature values shift with scanner, reconstruction kernel and slice thickness, so many published signatures do not survive external validation.",
    },
    {
      type: "content",
      heading: "Neurology and psychiatry",
      bullets: [
        "**Stroke imaging** is among the highest value deployments anywhere: automated detection of large vessel occlusion and haemorrhage, with direct effect on time to treatment.",
        "**EEG** for seizure detection and classification, where continuous monitoring produces more data than any human can read.",
        "**Neurodegeneration.** Volumetric MRI analysis, and speech or language markers of cognitive decline.",
        "**Psychiatry** has no imaging biomarker, so work concentrates on language, speech and behavioural signals, with correspondingly weaker evidence and much larger ethical exposure.",
      ],
      note: "Mental health prediction from social media and phone data attracts a lot of publication and very little clinical adoption. Ask who is acting on the output and under what consent before building in this space.",
    },
    {
      type: "content",
      heading: "Surgery, critical care and anaesthesia",
      bullets: [
        "**Intraoperative video** for phase recognition, instrument tracking and skill assessment.",
        "**Robotic assistance** remains teleoperated rather than autonomous. Nothing in routine practice cuts on its own.",
        "**ICU deterioration prediction** from continuous vitals, which is the most studied and most disappointing area in the field.",
        "**Anaesthesia depth and haemodynamic instability** prediction from waveform monitoring.",
      ],
      note: "The Epic Sepsis Model is the cautionary tale everyone in clinical AI should know. Externally validated by Wong et al. (JAMA Internal Medicine, 2021), it performed far worse than its marketed accuracy while already deployed across hundreds of hospitals.",
      aside: {
        title: "Why alerts fail",
        body: "A model with excellent AUC can still be useless if it fires constantly on a low prevalence outcome. Alert fatigue is a deployment failure, not a modelling one, and it is invisible in the metrics.",
      },
    },
    {
      type: "content",
      heading: "Primary care, triage and public health",
      bullets: [
        "**Symptom checkers and triage tools** reach far more people than any hospital system, and are held to a much lower evidence standard.",
        "**Risk scores** for cardiovascular disease, diabetes and readmission, embedded directly in the record.",
        "**Screening programme support.** Tuberculosis detection on chest radiographs is endorsed by WHO as a computer aided detection option where radiologists are scarce, which matters enormously in Nepal and across South Asia.",
        "**Outbreak detection and forecasting**, where the modelling is often the easy part and data reporting delays are the real constraint.",
      ],
      note: "Tuberculosis screening deserves attention from anyone working in a high burden country. The disease is common, the image is cheap, the readers are scarce and the treatment exists. Those four facts are what make a task tractable.",
    },
    {
      type: "content",
      heading: "Obstetrics, paediatrics and neonatology",
      bullets: [
        "**Fetal ultrasound.** Standard plane detection, biometry and gestational age estimation, which reduces dependence on operator skill.",
        "**Cardiotocography interpretation**, where human agreement is famously poor.",
        "**Neonatal monitoring** for sepsis and apnoea from continuous vitals.",
        "**Growth and developmental screening** from anthropometric data.",
      ],
      note: "Obstetric ultrasound is one of the clearest opportunities in low resource settings, because a handheld probe with automated guidance can put a usable scan in the hands of a midwife rather than a sonographer.",
    },
    {
      type: "content",
      heading: "Infectious disease, microbiology and pharmacy",
      bullets: [
        "**Antimicrobial resistance prediction** from genomic or phenotypic data, guiding treatment before culture results return.",
        "**Microscopy automation** for malaria, tuberculosis and parasites, replacing slide reading that is slow and depends on a skilled microscopist.",
        "**Drug interaction and dosing support**, including renal dose adjustment, which is a common and preventable source of harm.",
        "**Pharmacovigilance.** Mining adverse event reports and clinical notes for signals that a trial was too small to catch.",
      ],
    },
    {
      type: "content",
      heading: "Drug discovery and genomics",
      bullets: [
        "**AlphaFold2** (Jumper et al., Nature, 2021) predicted protein structure to near experimental accuracy and released structures for most known proteins, changing the starting point for structural biology.",
        "**Halicin** (Stokes et al., Cell, 2020) was identified as an antibiotic by screening chemical libraries with a trained model, then confirmed in the laboratory. A genuine machine led discovery.",
        "**Variant calling.** DeepVariant reframed genome variant identification as an image classification problem and improved accuracy over hand engineered callers.",
        "**Target identification, molecular property prediction and generative chemistry** are all active, and all still bounded by wet laboratory validation.",
      ],
      note: "Keep the timeline honest. A candidate identified computationally still needs synthesis, animal work and three phases of trials. Nothing yet compresses the decade that follows the discovery.",
    },
    {
      type: "content",
      heading: "Nursing, allied health and the parts nobody writes papers about",
      bullets: [
        "**Nurse staffing and acuity prediction**, which affects patient outcomes more directly than most diagnostic models.",
        "**Pressure injury and fall risk prediction**, both preventable harms with clear interventions.",
        "**Rehabilitation.** Movement analysis from video or wearables for physiotherapy adherence and progress.",
        "**Speech and language therapy**, using automatic speech analysis to track articulation and fluency.",
        "**Scheduling, bed management and discharge planning.** Unglamorous operational work where small gains compound across a whole hospital.",
      ],
      note: "Nurses generate and act on more clinical data than any other group, and are consulted least often when these systems are designed. If you want an unexploited research area, start there.",
    },
    {
      type: "section",
      part: "three",
      heading: "What cuts across every specialty",
      note: "Four applications that are not tied to one organ system.",
    },
    {
      type: "content",
      heading: "Clinical documentation and language models",
      bullets: [
        "**Ambient documentation** listens to a consultation and drafts the note. This is the fastest spreading application of language models in medicine, because the pain it solves is universal.",
        "**Coding and billing support**, which is where hospitals find the money to fund everything else.",
        "**Information extraction** from unstructured notes to build usable research datasets.",
        "**Patient facing summaries**, rewriting a discharge letter at a readable level, in the patient's language.",
      ],
      note: "Documentation burden is a leading contributor to clinician burnout. A tool that returns an hour a day to a doctor may improve care more than a diagnostic model with a better AUC.",
      aside: {
        title: "The safety catch",
        body: "A model that fabricates a plausible finding in a note creates a permanent error in the record that later clinicians will trust. Ambient tools need a human signing step, every time.",
      },
    },
    {
      type: "content",
      heading: "Large language models in clinical practice",
      bullets: [
        "**Benchmark performance is strong.** Med-PaLM 2 and GPT-4 class models score above the passing threshold on USMLE style question sets.",
        "**Benchmark performance is not clinical safety.** Multiple choice questions have one correct answer, a stated stem and no consequences. Consultations have none of those properties.",
        "**Where they genuinely help:** summarising, translating, drafting, explaining a diagnosis in plain language, and answering the questions patients are embarrassed to ask.",
        "**Where they fail:** confident fabrication of citations, drug doses and guidelines, and silent degradation on populations underrepresented in training text.",
        "**Retrieval grounding** against an approved formulary or guideline set is currently the most reliable way to use them for factual clinical content.",
      ],
      note: "The right framing for a clinician: it is an extremely capable writer with an unreliable memory and no accountability. Useful for transformation, dangerous as a source of fact.",
    },
    {
      type: "content",
      heading: "How clinical AI is evaluated, and how it should be",
      bullets: [
        "**AUC is not enough.** Report sensitivity and specificity at the operating point you would actually deploy, and say why you chose it.",
        "**Calibration matters more than discrimination** when the output is a probability a clinician will act on. A well ranked but badly calibrated model misleads.",
        "**External validation is the minimum bar.** Internal cross validation on one hospital's data tells you almost nothing about the next hospital.",
        "**Report by subgroup.** Age, sex, ethnicity, skin tone, device and site. Aggregate performance hides exactly the failures that matter.",
        "**Prospective and randomised evidence** is rare and is what actually establishes clinical benefit.",
      ],
      note: "Use the reporting standards. CONSORT-AI and SPIRIT-AI for trials, TRIPOD-AI for prediction models, CLAIM for imaging. Reviewers increasingly expect them and they make a paper much harder to dismiss.",
    },
    {
      type: "content",
      heading: "Regulation, liability and the route to a clinic",
      bullets: [
        "**Software that informs a clinical decision is a medical device** in the United States, the European Union, the United Kingdom, India and most other jurisdictions.",
        "**Risk classification drives the evidence burden.** A triage flag and an autonomous diagnosis sit in very different regulatory categories.",
        "**Locked versus adaptive models.** Regulators have historically required a fixed model, because a system that keeps learning after approval is a system whose behaviour was never approved.",
        "**Liability is unsettled.** When a model contributes to a missed diagnosis, responsibility is currently distributed between clinician, hospital and manufacturer in ways no court has firmly settled.",
      ],
      note: "Practical consequence for researchers: build the audit trail from the start. Version your data, your weights and your preprocessing. Retrofitting provenance to a two year old project is close to impossible.",
    },
    {
      type: "section",
      part: "four",
      heading: "Where it goes wrong",
      note: "These are not edge cases. Every one of them has happened at scale in a deployed system.",
    },
    {
      type: "content",
      heading: "Bias, and how it enters without anyone intending it",
      bullets: [
        "**Obermeyer et al. (Science, 2019)** found a widely used US health algorithm systematically under-referred Black patients, because it used healthcare spending as a proxy for healthcare need. Less had historically been spent on those patients, so the model learned they were less sick.",
        "**Device bias is real.** Sjoding et al. (NEJM, 2020) documented pulse oximeters overestimating oxygen saturation in patients with darker skin, so any model trained on those readings inherits the error.",
        "**Missing data is informative.** A test that was never ordered often signals something about the patient and the clinician, and models exploit that in ways that do not transfer.",
        "**Label noise.** Diagnostic codes reflect what was billed. Radiology reports reflect what was worth writing down. Neither is ground truth.",
      ],
      note: "The pattern is consistent. The model is doing exactly what it was asked to do; the harm comes from the target variable being a bad stand in for what anyone actually cared about.",
    },
    {
      type: "content",
      heading: "Shortcuts, drift and other quiet failures",
      bullets: [
        "**Shortcut learning.** Models have learned to detect pneumonia from the hospital that produced the scan, and to detect malignancy from the presence of a surgical ruler in dermoscopy images.",
        "**Dataset shift over time.** Scanners are replaced, protocols change, coding systems change, and a model silently degrades with no error message.",
        "**Automation bias.** Clinicians defer to a confident output more than they should, so a wrong model can be worse than no model.",
        "**Feedback loops.** A model that changes clinical behaviour changes the data it is later retrained on, and can entrench its own errors.",
      ],
      note: "None of this is detectable from a test set. It requires monitoring after deployment, which is the part almost nobody budgets for.",
    },
    {
      type: "content",
      heading: "Privacy, consent and data governance",
      bullets: [
        "**Health data is special category data** under GDPR and equivalent regimes, with a higher bar for processing than ordinary personal data.",
        "**De-identification is weaker than it looks.** Records have been re-identified from combinations of dates, postcodes and rare diagnoses, and faces can be reconstructed from head CT.",
        "**Consent for care is not consent for research**, and certainly not consent for commercial model training.",
        "**Federated learning and synthetic data** are useful and partial answers. Neither removes the governance question.",
      ],
      note: "If you are a student with access to clinical data through a placement, get ethics approval before you touch it for a project. Retrospective approval is not a thing, and this ends careers.",
    },
    {
      type: "section",
      part: "five",
      heading: "Doing this work without a hospital or a cluster",
      note: "Which is the position most of our mentees are in.",
    },
    {
      type: "content",
      heading: "Open datasets you can start with today",
      bullets: [
        "**MIMIC-IV** and **eICU** on PhysioNet. Deidentified critical care records, free after a credentialing and ethics training step.",
        "**CheXpert**, **NIH ChestX-ray14** and **PadChest** for chest radiography.",
        "**ISIC** for dermoscopy, **CAMELYON** for pathology, **MedMNIST** for fast prototyping across many modalities.",
        "**UK Biobank** and **TCGA** for imaging with genomics and outcomes, subject to application.",
        "**PhysioNet challenges** for ECG, EEG and physiological waveforms, with published baselines to compare against.",
      ],
      note: "The credentialing step on PhysioNet takes a few hours and is the single highest return administrative task in this field. Do it before you need it.",
      aside: {
        title: "Compute is not the blocker",
        body: "Most published clinical AI results are reproducible on a single consumer GPU or a free hosted notebook. Access to data and to a clinician who will tell you the question is worth asking is much harder to get.",
      },
    },
    {
      type: "content",
      heading: "Choosing a question that will survive review",
      bullets: [
        "**Work with a clinician from day one.** The most common failure in student medical AI is a technically sound model answering a question no clinician has.",
        "**Local data is a real contribution.** A carefully built, well documented dataset from an under-represented population is more valuable than another incremental architecture.",
        "**External validation of a published model** is publishable, useful, and teaches more than building from scratch.",
        "**Negative results count here.** Showing that a widely used model fails on your population is a genuine finding and an ethical duty.",
        "**Deployment and workflow studies** are undersupplied because they are unglamorous and slow. That is exactly why there is room.",
      ],
    },
    {
      type: "content",
      heading: "Open problems worth a career",
      bullets: [
        "**Generalisation across sites** without retraining at every hospital.",
        "**Calibrated uncertainty**, so a model can say it does not know and a clinician can trust that silence.",
        "**Evaluation beyond high income settings.** Most benchmarks encode the populations, devices and disease prevalence of a handful of countries.",
        "**Multimodal integration.** Combining imaging, text, waveforms and genomics is where clinicians already work and where models mostly do not.",
        "**Monitoring after deployment**, which is close to unsolved and is where patient harm actually accumulates.",
      ],
      aside: {
        title: "Where the gaps are",
        body: "Well funded groups chase what is measurable on Western benchmarks. Tuberculosis, obstetric ultrasound, snakebite, rheumatic heart disease and malnutrition are under-researched for reasons that have nothing to do with difficulty.",
      },
    },
    {
      type: "content",
      heading: "A short reading list",
      lede: "Start with these, and follow their citations rather than reading survey papers.",
      bullets: [
        "Gulshan et al., JAMA 2016. Diabetic retinopathy. The field's clearest early success.",
        "Esteva et al., Nature 2017. Skin cancer classification, and the case for transfer learning.",
        "Attia et al., Nature Medicine 2019. Finding what a human reader cannot see in an ECG.",
        "Obermeyer et al., Science 2019. How a sensible proxy produced racial bias at scale.",
        "Wong et al., JAMA Internal Medicine 2021. External validation of a deployed sepsis model.",
        "Jumper et al., Nature 2021. AlphaFold2.",
        "CONSORT-AI and SPIRIT-AI, Nature Medicine 2020. How to report a clinical AI trial properly.",
      ],
      note: "Read the papers, not the press releases about the papers. The gap between the two in this field is unusually wide.",
    },
    {
      type: "end",
      heading: "Bring us a clinical question",
      note: "We supervise research from question to submission, including work in medicine and health. Free, and open to anyone from an under-resourced region.",
    },
  ],
};

/* ========================================================================== */

export const deepLearningFoundations = {
  ...base,
  slug: "deep-learning-foundations",
  title: "Deep Learning: Foundations",
  shortTitle: "Deep Learning",
  subtitle:
    "Neural networks from the single neuron up to the transformer: backpropagation, what depth actually buys you, how attention replaced recurrence, and what happens inside a large language model.",
  kicker: "Fulcrum course notes · 04",
  slides: [
    { type: "title" },
    ABOUT_SLIDE,
    {
      type: "section",
      part: "one",
      heading: "A neuron is a weighted sum and a squashing function",
      note: "Everything else is arrangement and scale.",
    },
    {
      type: "content",
      heading: "From neuron to network",
      bullets: [
        "One unit computes `z = w·x + b`, then applies a non-linearity `a = σ(z)`.",
        "Stack units into a **layer**; stack layers into a network. Each layer's output is the next layer's input.",
        "Without the non-linearity, stacked linear layers collapse into a single linear layer, depth would buy nothing.",
        "The **universal approximation theorem** says one wide hidden layer can approximate any continuous function. It says nothing about whether you can find those weights.",
      ],
      note: "Depth matters in practice because it lets the network reuse intermediate features, so it needs far fewer units than an equivalent shallow model.",
    },
    {
      type: "content",
      heading: "Activation functions",
      bullets: [
        "**Sigmoid** and **tanh** saturate at the extremes, where gradients vanish. This stalled deep networks for years.",
        "**ReLU** (`max(0, x)`) does not saturate for positive input, is cheap, and made deep training practical.",
        "**Leaky ReLU** and **GELU** address ReLU's dead-unit problem; GELU is standard in transformers.",
        "Output layer is chosen by the task: none for regression, sigmoid for binary, softmax for multi-class.",
      ],
    },
    {
      type: "content",
      heading: "Backpropagation",
      lede: "Not a learning algorithm, an efficient way to compute gradients.",
      bullets: [
        "The **forward pass** computes predictions and the loss, caching intermediate values.",
        "The **backward pass** applies the chain rule from the loss back to every parameter, reusing those cached values.",
        "Cost is roughly the same as the forward pass, which is what makes training large networks feasible at all.",
        "Frameworks build a computation graph and do this automatically, but understanding it is what lets you debug a model that will not learn.",
      ],
      aside: {
        title: "Do this once",
        body: "Implement a two-layer network and its gradients in NumPy, no framework. It takes an afternoon and permanently removes the mystery.",
      },
    },
    {
      type: "content",
      heading: "Why deep networks refuse to train",
      bullets: [
        "**Vanishing gradients**, repeated multiplication by small numbers drives early-layer gradients to zero.",
        "**Exploding gradients**, the same mechanism in reverse; fix with gradient clipping.",
        "**Poor initialisation**, Xavier and He initialisation keep activation variance stable across layers.",
        "**Internal covariate shift**, layer input distributions move as earlier layers update, which normalisation addresses.",
      ],
    },
    {
      type: "content",
      heading: "Normalisation and residuals",
      bullets: [
        "**Batch normalisation** standardises activations per mini-batch. Enables higher learning rates, and behaves differently at train and test time, a frequent source of bugs.",
        "**Layer normalisation** normalises across features within one example, so it is independent of batch size. Standard in transformers.",
        "**Residual connections** (`out = F(x) + x`) give gradients a direct path backwards and made very deep networks trainable.",
        "Together, these three are why 2015-era networks could go deep when 2012-era ones could not.",
      ],
    },
    {
      type: "content",
      heading: "The main architecture families",
      bullets: [
        "**MLPs**, fully connected. Fine for tabular data; wasteful on images because they ignore spatial structure.",
        "**CNNs**, weight sharing and locality. Efficient wherever position matters and patterns repeat.",
        "**RNNs and LSTMs**, process sequences with a carried hidden state. Largely superseded, but still sensible for small-data sequence problems.",
        "**Transformers**, attention over a whole sequence at once, and now dominant across text, vision and audio. Part two takes these apart properly.",
      ],
    },
    {
      type: "content",
      heading: "Training in practice",
      bullets: [
        "**Learning rate** is the hyperparameter that matters most. Sweep it over orders of magnitude before tuning anything else.",
        "**Schedules**, warmup then cosine decay is a reliable default.",
        "**Batch size** trades gradient noise against throughput; larger batches usually need a larger learning rate.",
        "**Mixed precision** roughly halves memory and speeds training substantially on modern GPUs.",
      ],
      note: "Debugging order: overfit a single batch. If the model cannot drive loss to near zero on ten examples, you have a bug, not a modelling problem.",
    },
    {
      type: "content",
      heading: "Transfer learning",
      lede: "The single most useful technique if you do not have a large dataset or a cluster.",
      bullets: [
        "Take a model pretrained on a large corpus; its early features are broadly reusable.",
        "**Feature extraction**, freeze the backbone, train a new head. Fast, and works with very little data.",
        "**Fine-tuning**, unfreeze some or all layers at a low learning rate. Better results, more data needed.",
        "**Parameter-efficient methods** tune a small number of extra weights rather than the whole model, which is what makes large models adaptable on modest hardware. Part three shows how.",
      ],
      aside: {
        title: "Why this matters here",
        body: "Nearly every Fulcrum mentee is working without institutional compute. Transfer learning and PEFT are what make serious work possible on a free Colab tier.",
      },
    },
    {
      type: "section",
      part: "two",
      heading: "Attention, and the problem it was invented to solve",
      note: "Everything so far applies to any network. This part is about the one architecture that now dominates the field.",
    },
    {
      type: "content",
      heading: "What was wrong with recurrence",
      bullets: [
        "An RNN compresses everything seen so far into one fixed-size hidden state, a bottleneck for long inputs.",
        "It is **inherently sequential**, so it cannot exploit parallel hardware during training.",
        "Long-range dependencies degrade: gradients must travel through every intervening step.",
        "LSTMs and GRUs mitigated this with gating, but did not remove either limitation.",
      ],
    },
    {
      type: "content",
      heading: "Attention, stated plainly",
      lede: "Let every position look directly at every other position, and learn how much to weight each.",
      bullets: [
        "Each token produces three vectors: a **query**, a **key**, and a **value**.",
        "Compare one token's query against all keys to get a relevance score per token.",
        "Softmax those scores into weights; the output is the weighted sum of values.",
        "Nothing is compressed into a bottleneck, and every comparison happens in parallel.",
      ],
      aside: { title: "Resolving a pronoun", svg: ATTENTION_SVG },
    },
    {
      type: "content",
      heading: "The formula, decoded",
      lede: "`Attention(Q, K, V) = softmax(QKᵀ / √d) V`",
      bullets: [
        "`QKᵀ`, every query dotted with every key, giving a score matrix of shape `n × n`.",
        "`/ √d`, scaling by the square root of head dimension. Without it, large dot products push softmax into saturation and gradients vanish.",
        "`softmax`, turns scores into weights that sum to one.",
        "`V`, the weighted sum of values is the output for that position.",
      ],
      note: "That `n × n` matrix is the whole efficiency story: cost grows with the square of sequence length. Everything called 'efficient attention' is an attack on that term.",
    },
    {
      type: "content",
      heading: "Multi-head attention",
      bullets: [
        "Run several attention operations in parallel, each with its own learned projections.",
        "Different heads specialise. Some track syntax, some track coreference, some attend to position.",
        "Concatenate the heads' outputs and project back to the model dimension.",
        "Each head works in a smaller subspace, so total cost is comparable to one full-width head.",
      ],
      note: "Head interpretations are suggestive, not definitive. Be careful reading too much meaning into attention maps. Attention weight is not the same thing as causal importance.",
    },
    {
      type: "content",
      heading: "The rest of the block",
      bullets: [
        "**Positional encoding**, attention is permutation-invariant, so position must be injected explicitly. Sinusoidal originally; rotary (RoPE) is now common.",
        "**Feed-forward network**, a per-position MLP, typically 4× the model width. This is where most parameters live.",
        "**Residual connections** around both sub-layers, plus **layer normalisation**.",
        "Stack this block N times. That is the entire architecture.",
      ],
    },
    {
      type: "section",
      part: "three",
      heading: "From architecture to language model",
      note: "The architecture is simple. The behaviour comes from scale and training objective.",
    },
    {
      type: "content",
      heading: "Encoder, decoder, or both",
      bullets: [
        "**Encoder-only** (BERT), bidirectional context, trained by masking tokens. Good for classification and retrieval.",
        "**Decoder-only** (GPT family), causal masking so each position sees only the past. Trained to predict the next token. Good for generation.",
        "**Encoder-decoder** (T5, original Transformer), natural fit for translation and summarisation.",
        "Decoder-only has become dominant largely because next-token prediction scales so cleanly.",
      ],
    },
    {
      type: "content",
      heading: "Tokenisation",
      bullets: [
        "Models operate on **subword tokens**, not characters or words, via byte-pair encoding or similar.",
        "This keeps vocabulary manageable while handling unseen words by composition.",
        "Tokenisers are trained mostly on English-dominant corpora, so other scripts often fragment into far more tokens.",
        "That is a real equity issue: the same sentence in Nepali can cost several times more tokens than in English, making it slower and more expensive to process.",
      ],
      aside: {
        title: "Worth checking yourself",
        body: "Run a sentence in your own language through a tokeniser and count. It is a concrete, publishable observation about who these systems are cheap for.",
      },
    },
    {
      type: "content",
      heading: "How training actually proceeds",
      bullets: [
        "**Pretraining**, next-token prediction over an enormous corpus. This is where almost all compute goes.",
        "**Supervised fine-tuning**, training on curated instruction-and-response pairs to make the model follow requests.",
        "**Preference tuning** (RLHF, DPO), optimising against human preference comparisons.",
        "The base model has the knowledge; the later stages shape how it behaves.",
      ],
    },
    {
      type: "content",
      heading: "What these models do and do not do",
      bullets: [
        "They model the **distribution of text**. Fluency is the objective; truth is not.",
        "**Hallucination** is not a bug bolted on top. It is the same mechanism producing a plausible continuation that happens to be false.",
        "**Context window** bounds what the model can attend to. Beyond it, information is simply gone.",
        "They are strong at transformation (summarising, rewriting, translating) and much weaker as a factual store.",
      ],
      note: "Useful framing for teaching: it is an extremely good pattern completer. That explains both the impressive results and the confident errors.",
    },
    {
      type: "content",
      heading: "Working with these models on modest hardware",
      bullets: [
        "**Quantisation** to 4-bit or 8-bit lets sizeable open models run on a single consumer GPU.",
        "**LoRA** trains small low-rank updates instead of full weights, fine-tuning becomes affordable.",
        "**Retrieval-augmented generation** grounds answers in documents you supply, which is usually better than fine-tuning facts in.",
        "**Prompting well** costs nothing and is frequently the highest-return intervention available.",
      ],
    },
    {
      type: "content",
      heading: "Reading and reproducing papers",
      bullets: [
        "Read in this order: abstract, figures, results, then method. Introductions are the least informative part.",
        "Ask what the **baseline** is and whether the comparison is fair, same data, same compute, same tuning effort.",
        "Check whether code and weights are released. Unreleased results should be treated as provisional.",
        "Reproducing a paper is a legitimate contribution, and it teaches more than reading twenty.",
      ],
    },
    {
      type: "content",
      heading: "Open questions worth a paper",
      bullets: [
        "Tokenisation and cost equity across scripts and low-resource languages.",
        "Evaluation beyond English. Most benchmarks do not transfer, and building one for your language is a genuine contribution.",
        "Small-model performance under tight compute, which matters far more outside well-funded labs.",
        "Careful failure analysis of deployed systems in specific domains. Unglamorous, useful, and publishable.",
      ],
      aside: {
        title: "Choosing a question",
        body: "The frontier is crowded and expensive. The gaps are in places large labs have no reason to look, which is precisely where our mentees live.",
      },
    },
    {
      type: "end",
      heading: "Bring us something you are building",
      note: "Fulcrum mentors work through exactly this, from a first network to a research question worth submitting. Free, and open to anyone from an under-resourced region.",
    },
  ],
};

/* Order here is the order they appear on the Resources page. */
export const decks = [
  aiForEveryone,
  computerVisionFoundations,
  computerVisionAdvanced,
  machineLearning,
  deepLearningFoundations,
  aiInMedicine,
  aiForExperts,
];
